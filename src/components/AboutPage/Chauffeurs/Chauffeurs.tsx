import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Button from "@/components/shared/Button/Button";
import styles from "./Chauffeurs.module.css";

type Chauffeur = {
  name: string;
  role: string;
  years: number;
  /** Add a portrait path (e.g. "/images/team/daniel.jpg") to replace the initials. */
  photo?: string;
};

const TEAM: Chauffeur[] = [
  { name: "Daniel Ortega", role: "Founder & chauffeur", years: 15 },
  { name: "Marcus Reyes", role: "Lead chauffeur", years: 9 },
  { name: "Elena Vasquez", role: "Airport specialist", years: 7 },
  { name: "James Whitfield", role: "Senior chauffeur", years: 11 },
  { name: "Tanya Brooks", role: "Sprinter & group trips", years: 6 },
  { name: "Omar Haddad", role: "Overnight shift lead", years: 5 },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function Chauffeurs() {
  return (
    <section className={styles.section} aria-labelledby='chauffeurs-heading'>
      <LayoutWrapper paddingNone='paddingNone'>
        {/* ── Heading row ── */}
        <div className={styles.layout}>
          <div className={styles.labelCol}>
            <span className={styles.tag}>Chauffeurs</span>
          </div>

          <div className={styles.header}>
            <h2 id='chauffeurs-heading' className={styles.heading}>
              Chauffeurs, not drivers.
            </h2>
            <div className={styles.headerRight}>
              <p className={styles.intro}>
                Every Mesa Midnight chauffeur is a full-time employee with a
                commercial license, a background check and at least three years
                of professional driving. They train on our routes before they
                drive alone, including every gate at Sky Harbor and the private
                terminals at Falcon Field.
              </p>
              <div className={styles.headerBtn}>
                <Button
                  href='/book'
                  text='Book a ride'
                  btnType='underlinedBlack'
                  arrow
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Team grid ── */}
        <ul className={styles.grid}>
          {TEAM.map((c) => (
            <li key={c.name} className={styles.card}>
              <div className={styles.photo}>
                {c.photo ? (
                  <Image
                    src={c.photo}
                    alt={`${c.name}, ${c.role}`}
                    fill
                    sizes='(max-width: 568px) 100vw, (max-width: 968px) 50vw, 26vw'
                    className={styles.image}
                  />
                ) : (
                  <span className={`${styles.initials} h2`} aria-hidden='true'>
                    {initials(c.name)}
                  </span>
                )}
              </div>

              <div className={styles.info}>
                <div className={styles.infoText}>
                  <h3 className={styles.name}>{c.name}</h3>
                  <p className={styles.role}>{c.role}</p>
                </div>
                <span
                  className={styles.years}
                  title={`${c.years} years driving professionally`}
                >
                  <span className={styles.srOnly}>
                    {c.years} years driving professionally
                  </span>
                  <span aria-hidden='true'>{c.years}y</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
