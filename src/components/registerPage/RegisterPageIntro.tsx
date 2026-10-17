import LayoutWrapper from "@/components/shared/LayoutWrapper";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import styles from "./RegisterPageIntro.module.css";

export default function RegisterPageIntro() {
  return (
    <section className={styles.section} aria-labelledby='register-heading'>
      <LayoutWrapper>
        {/* ── Heading ── */}
        <div className={styles.header}>
          <span className={styles.tag}>
            <svg className={styles.tagIcon} viewBox='0 0 16 16' aria-hidden='true'>
              <path
                d='M8 0c.4 4.2 3.8 7.6 8 8-4.2.4-7.6 3.8-8 8-.4-4.2-3.8-7.6-8-8 4.2-.4 7.6-3.8 8-8Z'
                fill='currentColor'
              />
            </svg>
            Your account
          </span>
          <h1 id='register-heading' className={`${styles.heading} h2`}>
            Create an account
          </h1>
          <p className={styles.copy}>
            Book faster next time, with your addresses and cards saved.
          </p>
        </div>

        {/* ── Card ── */}
        <div className={styles.card}>
          <div className={styles.inner}>
            <span className={styles.iconBox} aria-hidden='true'>
              {/* person + plus */}
              <svg
                className={styles.icon}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='9.5' cy='8' r='4' />
                <path d='M2.5 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5M19 8v6M16 11h6' />
              </svg>
            </span>

            <h2 className={styles.cardTitle}>Sign up</h2>
            <p className={styles.cardCopy}>
              It takes a minute. You can track your rides, download receipts
              and rebook a trip in a few taps.
            </p>

            <div className={styles.form}>
              <RegisterForm />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
