
import Account from "@components/home/Account";
import { BannerSkeleton } from "@components/home/EventBanner";
import dynamic from "next/dynamic";

const EventBanner = dynamic(()=> import("@components/home/EventBanner"), {
  ssr : false,
  loading : () => (
    <BannerSkeleton />
  )
}) 

export default function Home() {
  return (
    <div>
      <EventBanner />
      <Account />
    </div>
  );
}
