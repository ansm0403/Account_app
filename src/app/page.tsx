
import Spacing from "@/components/shared/Spacing";
import Account from "@components/home/Account";
import { BannerSkeleton } from "@components/home/EventBanner";
import dynamic from "next/dynamic";

const EventBanner = dynamic(()=> import("@components/home/EventBanner"), {
  ssr : false,
  loading : () => (
    <BannerSkeleton />
  )
}) 

const CreditScore = dynamic(()=> import("@components/home/CreditScore"),{
  ssr : false,
  loading : () => null
})

export default function Home() {
  return (
    <div>
      <EventBanner />
      <Account />
      <Spacing size = {8} backgroundColor="gray100" />
      <CreditScore />
    </div>
  );
}
