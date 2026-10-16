"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./ContactSection.module.css";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

/** (555) 555-5555 as you type */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Demo contact form: checks the fields, then shows a success toast and
 * clears itself. Nothing is sent anywhere yet.
 */
export default function ContactPageForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [sending, setSending] = useState(false);

  const set =
    (key: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = key === "phone" ? formatPhone(e.target.value) : e.target.value;
      setFields((f) => ({ ...f, [key]: v }));
    };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    if (fields.phone && fields.phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a 10-digit phone number.");
      return;
    }

    setSending(true);
    // Short pause so the button state is visible; swap for a real request later.
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setFields(EMPTY);
    toast.success(
      `Thanks${fields.firstName ? `, ${fields.firstName}` : ""}! Your message is on its way. We'll be in touch soon.`,
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={`${styles.formTitle} h5`}>Tell us about your trip</h2>
      <p className={styles.formIntro}>
        Booking questions, corporate accounts, weddings and group trips. Fill
        in the form and we&apos;ll reply promptly.
      </p>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>First name</span>
          <input
            className={styles.input}
            name='firstName'
            autoComplete='given-name'
            placeholder='First name'
            required
            value={fields.firstName}
            onChange={set("firstName")}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Last name</span>
          <input
            className={styles.input}
            name='lastName'
            autoComplete='family-name'
            placeholder='Last name'
            required
            value={fields.lastName}
            onChange={set("lastName")}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Email address</span>
          <input
            className={styles.input}
            type='email'
            name='email'
            autoComplete='email'
            placeholder='Email address'
            required
            value={fields.email}
            onChange={set("email")}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Phone</span>
          <input
            className={styles.input}
            type='tel'
            name='phone'
            autoComplete='tel'
            inputMode='tel'
            placeholder='(480) 555-0147'
            value={fields.phone}
            onChange={set("phone")}
          />
        </label>

        <label className={`${styles.field} ${styles.full}`}>
          <span className={styles.fieldLabel}>Subject</span>
          <input
            className={styles.input}
            name='subject'
            placeholder='Airport pickup, wedding, corporate account…'
            required
            value={fields.subject}
            onChange={set("subject")}
          />
        </label>

        <label className={`${styles.field} ${styles.full}`}>
          <span className={styles.fieldLabel}>Message</span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name='message'
            placeholder='How can we help?'
            rows={5}
            required
            value={fields.message}
            onChange={set("message")}
          />
        </label>
      </div>

      <p className={styles.note}>
        *For same-day rides, call dispatch. It&apos;s the fastest way to reach
        us.
      </p>

      <button type='submit' className={styles.submit} disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
