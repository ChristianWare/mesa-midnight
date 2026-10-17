import LayoutWrapper from "@/components/shared/LayoutWrapper";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import styles from "./LoginPageIntro.module.css";

export default function LoginPageIntro() {
  return (
    <section className={styles.section} aria-labelledby='login-heading'>
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
          <h1 id='login-heading' className={`${styles.heading} h2`}>
            Welcome back
          </h1>
          <p className={styles.copy}>
            Your trips, saved addresses and receipts, all in one place.
          </p>
        </div>

        {/* ── Card ── */}
        <div className={styles.card}>
          <div className={styles.inner}>
            <span className={styles.iconBox} aria-hidden='true'>
              {/* key */}
              <svg
                className={styles.icon}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='15.5' cy='8.5' r='4.5' />
                <path d='M12.3 11.7 4 20M7 17l2.5 2.5M9.5 14.5 12 17' />
              </svg>
            </span>

            <h2 className={styles.cardTitle}>Sign in</h2>
            <p className={styles.cardCopy}>
              Enter the email and password you booked with to see your trips
              and manage your account.
            </p>

            <div className={styles.form}>
              <LoginForm />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
