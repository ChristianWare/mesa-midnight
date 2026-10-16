import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Instagram from "@/components/shared/icons/Instagram/Instagram";
import Facebook from "@/components/shared/icons/Facebook/Facebook";
import LinkedIn from "@/components/shared/icons/LinkedIn/LinkedIn";
import Twitter from "@/components/shared/icons/Twitter/Twitter";
import ContactPageForm from "./ContactPageForm";
import styles from "./ContactSection.module.css";

/**
 * Contact page top: heading, socials and details on the left, form on the
 * right. Contact details and social links come from Admin → Company
 * Settings (falling back to src/config/site.ts).
 */
export default async function ContactSection() {
  const s = await getCompanySettings();

  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw || SITE.phone.tel;
  const emails = [SITE.email.reservations, s.supportEmail || SITE.email.support];

  // Only the networks that are filled in.
  const socials = [
    { label: "X (Twitter)", href: s.twitterUrl, Icon: Twitter },
    { label: "Instagram", href: s.instagramUrl, Icon: Instagram },
    { label: "LinkedIn", href: s.linkedinUrl, Icon: LinkedIn },
    { label: "Facebook", href: s.facebookUrl, Icon: Facebook },
  ].filter((x) => x.href);

  return (
    <section className={styles.section} aria-labelledby='contact-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        <div className={styles.grid}>
          {/* ── Left ── */}
          <div className={styles.left}>
            <div>
              <span className={styles.tag}>Contact</span>
              <h1 id='contact-heading' className={styles.heading}>
                Need a ride? We&apos;re up.
              </h1>
              <p className={styles.intro}>
                Questions about a booking, a corporate account or a group trip?
                Send a note and dispatch will get back to you, usually within
                the hour.
              </p>

              {socials.length > 0 && (
                <ul className={styles.socials}>
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={label}
                        className={styles.social}
                      >
                        <Icon className={styles.socialIcon} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.label}>Email:</span>
                {emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className={styles.value}>
                    {e}
                  </a>
                ))}
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Dispatch, 24/7:</span>
                <a href={`tel:${phoneTel}`} className={styles.value}>
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <ContactPageForm />
        </div>
      </LayoutWrapper>
    </section>
  );
}
