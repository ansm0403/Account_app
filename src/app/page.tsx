
import Skeleton from "@/components/shared/Skeletion";
import dynamic from "next/dynamic";

const EventBanner = dynamic(()=> import("@/components/home/EventBanner"), {
  ssr : false,
  loading : () => (
    <Skeleton width = "100%" height={100} style ={{borderRadius : 8}} />
  )
}) 

export default function Home() {
  return (
    <div>
      <EventBanner />
    </div>
  );
}
