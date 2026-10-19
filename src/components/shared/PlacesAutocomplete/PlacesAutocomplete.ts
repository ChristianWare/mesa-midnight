/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Address search on Google's Places API (New).
 *
 * Google stopped allowing the old `google.maps.places.Autocomplete` widget
 * on new Cloud projects (Places API "Legacy"). This class is a drop-in
 * replacement with the same shape the app already uses:
 *
 *   const ac = new PlacesAutocomplete(inputEl, { componentRestrictions: { country: "us" } });
 *   ac.addListener("place_changed", () => {
 *     const place = ac.getPlace();
 *     place.place_id; place.formatted_address; place.geometry.location.lat();
 *   });
 *
 * It keeps your own <input> (so its styling is untouched) and draws its own
 * suggestion list under it. Needs the Maps JS API loaded with the `places`
 * library and "Places API (New)" enabled on the key.
 */
import styles from "./PlacesAutocomplete.module.css";

/** Same fields the old widget returned. */
export type LegacyPlace = {
  place_id: string;
  formatted_address: string;
  name?: string;
  geometry: { location: { lat(): number; lng(): number } };
};

type Options = {
  /** Kept for compatibility; only `componentRestrictions.country` is used. */
  fields?: string[];
  componentRestrictions?: { country?: string | string[] };
};

type Listener = () => void;

const DEBOUNCE_MS = 200;
const MIN_CHARS = 3;

function getPlacesLib(): any | null {
  const places = (window as any).google?.maps?.places;
  return places?.AutocompleteSuggestion ? places : null;
}

export class PlacesAutocomplete {
  private input: HTMLInputElement;
  private regionCodes: string[] | undefined;
  private listeners = new Set<Listener>();
  private place: LegacyPlace | undefined;

  private list: HTMLDivElement | null = null;
  private suggestions: any[] = [];
  private active = -1;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private requestId = 0;
  private sessionToken: any = null;
  private destroyed = false;

  constructor(input: HTMLInputElement, options: Options = {}) {
    this.input = input;
    const country = options.componentRestrictions?.country;
    this.regionCodes = country
      ? (Array.isArray(country) ? country : [country]).map((c) =>
          c.toLowerCase(),
        )
      : undefined;

    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-autocomplete", "list");

    input.addEventListener("input", this.onInput);
    input.addEventListener("keydown", this.onKeyDown);
    input.addEventListener("blur", this.onBlur);
    input.addEventListener("focus", this.onFocus);
    window.addEventListener("resize", this.position);
    window.addEventListener("scroll", this.position, true);
  }

  /** Only "place_changed" is supported (the one the app uses). */
  addListener(event: string, fn: Listener) {
    if (event === "place_changed") this.listeners.add(fn);
    return { remove: () => this.listeners.delete(fn) };
  }

  getPlace(): LegacyPlace | undefined {
    return this.place;
  }

  /** Detach everything (safe to call more than once). */
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("keydown", this.onKeyDown);
    this.input.removeEventListener("blur", this.onBlur);
    this.input.removeEventListener("focus", this.onFocus);
    window.removeEventListener("resize", this.position);
    window.removeEventListener("scroll", this.position, true);
    if (this.timer) clearTimeout(this.timer);
    this.list?.remove();
    this.list = null;
    this.listeners.clear();
  }

  // ── Typing → suggestions ────────────────────────────────────────────────
  private onInput = () => {
    if (this.timer) clearTimeout(this.timer);
    const text = this.input.value.trim();
    if (text.length < MIN_CHARS) {
      this.hide();
      return;
    }
    this.timer = setTimeout(() => void this.fetchSuggestions(text), DEBOUNCE_MS);
  };

  private onFocus = () => {
    if (this.suggestions.length && this.input.value.trim().length >= MIN_CHARS) {
      this.render();
    }
  };

  private async fetchSuggestions(text: string) {
    const places = getPlacesLib();
    if (!places) return;
    const id = ++this.requestId;
    try {
      if (!this.sessionToken) {
        this.sessionToken = new places.AutocompleteSessionToken();
      }
      const request: any = { input: text, sessionToken: this.sessionToken };
      if (this.regionCodes) request.includedRegionCodes = this.regionCodes;

      const { suggestions } =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
      if (id !== this.requestId || this.destroyed) return; // a newer search won

      this.suggestions = (suggestions ?? [])
        .map((s: any) => s.placePrediction)
        .filter(Boolean);
      this.active = -1;
      if (this.suggestions.length) this.render();
      else this.hide();
    } catch {
      // Key not allowed / network issue: just no suggestions (manual entry still works)
      this.hide();
    }
  }

  // ── Picking one ─────────────────────────────────────────────────────────
  private async select(index: number) {
    const prediction = this.suggestions[index];
    if (!prediction) return;
    this.hide();
    try {
      const place = prediction.toPlace();
      await place.fetchFields({
        fields: ["id", "formattedAddress", "location", "displayName"],
      });
      if (this.destroyed) return;

      const address: string =
        place.formattedAddress ?? prediction.text?.text ?? this.input.value;
      // Like the old widget: set the field's text without firing an input event
      this.input.value = address;

      this.place = {
        place_id: place.id,
        formatted_address: address,
        name: place.displayName ?? undefined,
        geometry: { location: place.location },
      };
      this.sessionToken = null; // a pick ends the billing session
      this.suggestions = [];
      this.listeners.forEach((fn) => fn());
    } catch {
      // leave the typed text in place
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.list || !this.suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.active = (this.active + 1) % this.suggestions.length;
      this.render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.active =
        (this.active - 1 + this.suggestions.length) % this.suggestions.length;
      this.render();
    } else if (e.key === "Enter") {
      // Don't submit the form while the list is open
      e.preventDefault();
      void this.select(this.active >= 0 ? this.active : 0);
    } else if (e.key === "Escape") {
      this.hide();
    }
  };

  private onBlur = () => {
    // Give a click on a suggestion time to land first
    setTimeout(() => this.hide(), 150);
  };

  // ── Drawing the list ────────────────────────────────────────────────────
  private render() {
    if (!this.list) {
      this.list = document.createElement("div");
      this.list.className = `${styles.list} pac-container`;
      this.list.setAttribute("role", "listbox");
      document.body.appendChild(this.list);
    }
    const list = this.list;
    list.innerHTML = "";

    this.suggestions.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = `${styles.item}${i === this.active ? ` ${styles.itemActive}` : ""}`;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(i === this.active));

      const main = document.createElement("span");
      main.className = styles.main;
      main.textContent = p.mainText?.text ?? p.text?.text ?? "";
      item.appendChild(main);

      const secondary = p.secondaryText?.text;
      if (secondary) {
        const sub = document.createElement("span");
        sub.className = styles.secondary;
        sub.textContent = secondary;
        item.appendChild(sub);
      }

      // mousedown (not click) so it fires before the input's blur
      item.addEventListener("mousedown", (e) => {
        e.preventDefault();
        void this.select(i);
      });
      list.appendChild(item);
    });

    // Required attribution when results aren't shown on a Google map
    const footer = document.createElement("div");
    footer.className = styles.footer;
    footer.textContent = "Powered by Google";
    list.appendChild(footer);

    list.style.display = "block";
    this.position();
  }

  private position = () => {
    if (!this.list || this.list.style.display === "none") return;
    const r = this.input.getBoundingClientRect();
    this.list.style.top = `${r.bottom + window.scrollY + 4}px`;
    this.list.style.left = `${r.left + window.scrollX}px`;
    this.list.style.width = `${Math.max(r.width, 260)}px`;
  };

  private hide() {
    if (this.list) this.list.style.display = "none";
  }
}
