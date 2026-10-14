import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Hero.module.css";
import Button from "@/components/shared/Button/Button";

export default function Hero() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h1>
            On time at 4 a.m. <br /> On time at midnight.
          </h1>
          <p className={styles.copy}>
            Mesa Midnight is a 24/7 black car service for the East Valley.
            Flat-rate airport transfers, executive travel and late nights out,
            with a professional chauffeur and a price you see before you book.
          </p>
          <div className={styles.btnContainer}>
            <Button href='/book' text='Book a ride' btnType='whiteMain' arrow />
            <Button
              href='tel:+14805550147'
              text='(480) 555-0147'
              btnType='underlinedBlack'
              arrow
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
