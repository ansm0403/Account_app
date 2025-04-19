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

function EventBanner() {
  const { data } = useEventBanner()
  const [ loading, setLoading ] = useState(false);

  return (
    <div style={{padding : 24}}>
      <Swiper spaceBetween={8}>
        {data?.map((banner)=>{
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
