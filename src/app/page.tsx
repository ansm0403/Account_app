
import Spacing from "@/components/shared/Spacing";
import Account from "@components/home/Account";
import { CreditScoreSkeleton } from "@components/home/CreditScore";
import { BannerSkeleton } from "@components/home/EventBanner";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { User } from "@/model/user";
import { authOptions } from "./auth/authOptions";
import MenuBar from "@/components/home/MenuBar";
import Transactions from "@/components/account/Transactions";
import Text from '@components/shared/Text';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { store } from "@/remote/firebase";
import { COLLECTION } from "@/constant/collection";
import { Account as AccountType } from "@/model/account";

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
  const session = await getServerSession(authOptions);

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
      {
        (!session?.user) 
        ? <NoneSignTransactions />
        : <Transactions />
      }
      {/* <Spacing size = {4} backgroundColor="gray50" />
      <CardList /> */}
    </div>
  );
}

function NoneSignTransactions(){
  return(
      <div style = {{paddingTop : 24}} >
          <Text bold = {true} style = {{padding : 24}}>거래 내역</Text>
          <div style = {{
            padding : 24,
            textAlign : "center",
            fontSize : "1.2rem",
            fontWeight : "bold"
          }}>
            로그인 해주세요.
          </div>
        </div>
  )
}


async function accountGet() : Promise<DehydratedState | undefined>{
  const session = await getServerSession(authOptions);

  if(session != null && session.user != null){
    const client = new QueryClient();
    const queryKey = ["account", (session.user as User).id]

    await client.prefetchQuery({
      queryKey,
      queryFn : () => {
        return new Promise((res) => {
            const accountQuery = query(
                collection(store, COLLECTION.ACCOUNT),
                where("userId", "==", (session.user as User).id)
            )

            const unsubscribe = onSnapshot(accountQuery, (snapshot) => {
                const accounts = snapshot.empty 
                ? null 
                : snapshot.docs.map((doc)=>({
                    id : doc.id,
                    ...doc.data() as AccountType,
                })) 
                res(accounts);
                client.setQueryData(queryKey, accounts);
            })
            return () => unsubscribe();
        }
      )},
      staleTime : Infinity
    })

    const dehydrateState = dehydrate(client);

    return dehydrateState;
  } else {
    return undefined;
  }
}