
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const EventBanners = dynamic(()=> import("@/components/home/EventBanner"), {
  loading : () => <div>Loading...</div>,
}) 

export default function Home() {
  return (
    <div className={styles.page}>
      <EventBanner />
    </div>
    
  );
}
