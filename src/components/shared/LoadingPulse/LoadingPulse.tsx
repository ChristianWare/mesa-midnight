import Moon from "../icons/Moon/Moon";
import styles from "./LoadingPulse.module.css";

export default function LoadingPulse() {
  return (
    <div className={styles.container}>
      <Moon className={styles.thunderIcon} />
    </div>
  );
}
