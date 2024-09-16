import EventBanner from "@/components/home/EventBanner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <EventBanner />
    </div>
  );
}
