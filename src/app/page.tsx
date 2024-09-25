// import CardList from "@/components/home/CardList";
import { CardListSkeletion } from "@/components/home/CardList";
import Spacing from "@/components/shared/Spacing";
import Account from "@components/home/Account";
import { CreditScoreSkeleton } from "@components/home/CreditScore";
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
  loading : () => <CreditScoreSkeleton />
})

const CardList = dynamic(()=> import("@/components/home/CardList"),{
  ssr : false,
  loading : () => <CardListSkeletion />
})

export default function Home() {
  return (
    <div>
      <EventBanner />
      <Account />
      <Spacing size = {8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size = {8} backgroundColor="gray100" />
      <CardList />
    </div>
  );
}
