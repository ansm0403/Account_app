'use client'
import EventBanner from "@/components/home/EventBanner";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const EventBanners = dynamic(()=> import("@/components/home/EventBanner"), {
  ssr : false,
}) 

export default function Home() {
  return (
    <div className={styles.page}>
      <EventBanner />
    </div>
  );
}
