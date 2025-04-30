// import CardList from "@/components/home/CardList";
// import { CardListSkeleton } from "@/components/home/CardList";
import Spacing from "@/components/shared/Spacing";
import Account from "@components/home/Account";
import { CreditScoreSkeleton } from "@components/home/CreditScore";
import { BannerSkeleton } from "@components/home/EventBanner";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAccount } from "@/remote/account";
import { User } from "@/model/user";
import { authOptions } from "./auth/authOptions";
import MenuBar from "@/components/home/MenuBar";
import Transactions from "@/components/account/Transactions";


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

// const CardList = dynamic(()=> import("@/components/home/CardList"),{
//   ssr : false,
//   loading : () => <CardListSkeleton />
// })

export default async function Home() {

  const dehydrateState = await accountGet();

  return (
    <div>
      <EventBanner  />
      <HydrationBoundary state = {dehydrateState}>
        <Account />
      </HydrationBoundary>
      <Spacing size = {4} backgroundColor="gray50" />
      <MenuBar />
      <Spacing size = {4} backgroundColor="gray50" />
      <CreditScore />
      <Spacing size = {4} backgroundColor="gray50" />
      <Transactions />
      {/* <Spacing size = {4} backgroundColor="gray50" />
      <CardList /> */}
    </div>
  );
}


async function accountGet() : Promise<DehydratedState | undefined>{
  const session = await getServerSession(authOptions);

  if(session != null && session.user != null){
    const client = new QueryClient();

    await client.prefetchQuery({
      queryKey : ["account", (session.user as User).id],
      queryFn : () => getAccount((session.user as User).id),
    })

    const dehydrateState = dehydrate(client);

    return dehydrateState;
  } else {
    return undefined;
  }
}