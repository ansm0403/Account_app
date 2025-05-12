'use client'

import useEventBanner from './hooks/useEventBanner'
import withSusepnse from '@/hook/withSuspense';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Flex from '../shared/Flex';
import Text from '../shared/Text';
import Skeleton from '../shared/Skeletion';
import Image from "next/image"
import { useState } from 'react';
import Loading from '../shared/Loading';
import useAccount from '@/hook/useAccount';
import MyCard from './MyCard';

function EventBanner() {
  const { data : eventBanner } = useEventBanner()
  const [ loading, setLoading ] = useState(false);

  const { data : accounts } = useAccount();

  const account = accounts?.[0];

  if(account?.status === "READY") return null

  if(account) return <MyCard account = {account}/>

  return (
    <div style={{padding : 24}}>
      <Swiper spaceBetween={8}>
        {eventBanner?.map((banner)=>{
          return (
          <SwiperSlide key = {banner.id}>
            <Link href = {banner.link}>
              <Flex 
                style={{backgroundColor : banner.backgroundColor, ...bannerStyle}}
                justify='space-between'  
                onClick={()=>{setLoading(true)}}
              >
                <Flex direction='column'>
                  <Text bold= {true}>{banner.title}</Text>
                  <Text typography='t6'>{banner.subTitle}</Text>
                </Flex>
                <Image src = {banner.iconUrl} width={40} height={40} alt = "eventbanner-img" />
              </Flex>  
            </Link>
          </SwiperSlide>
          )
        })}
      </Swiper>
      {
        loading && <Loading />
      }
    </div>
  )
}

// export async function getAccount(
//   userId : string, 
// ) : Promise<AccountSnapshot[] | null>
// {

//   const accountQuery = query(
//       collection(store, COLLECTION.ACCOUNT),
//       where("userId", "==", userId)
//   )

  // const snapshot = await getDocs(accountQuery);

  // if(snapshot.empty) return null
  // else{
  //     return snapshot.docs.map((doc)=>{
  //         return {
  //             id : doc.id,
  //             ...(doc.data() as Account),
  //         }
  //     })
  // }
  
//   const result : AccountSnapshot[] = [];

//   return new Promise<AccountSnapshot[] | null>((res)=>{
//       onSnapshot(accountQuery, (snapshot) => {
//           snapshot.docs.map((doc)=>{
//               result.push({
//                   id : doc.id,
//                   ...(doc.data() as Account)
//               })
//           })
//           // setData(result)
//           res(result);
//       })
//   }).then((data)=>{
//       if((data as AccountSnapshot[]).length === 0) return null;
//       else {
//           setData(data);
//           return data;
//       }
//   })
// }

const bannerStyle = {
  borderRadius : "8px",
  padding : "24px"
}

export function BannerSkeleton() {
  return (
    <div style = {{padding : 24}}>
      <Skeleton width = "100%" height={100} style ={{borderRadius : 8}} />
    </div>
  )
}

export default withSusepnse(EventBanner, {
  fallback : <BannerSkeleton />
})
