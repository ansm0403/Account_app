import React from 'react'
import useEventBanner from './hooks/useEventBanner'
import withSusepnse from '@/hook/withSuspense';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/vue';
import Link from 'next/link';
import Flex from '../shared/Flex';
import Text from '../shared/Text';

function EventBanner() {
  const { data } = useEventBanner()

  console.log("data",  data);
  
  return (
    <div>
      <Swiper>
        {data?.map((banner)=>{
          return (
          <SwiperSlide key = {banner.id}>
            <Link href = {banner.link}>
              <Flex 
                style={{backgroundColor : banner.backgroundColor}}
                justify='space-between'  
              >
                <Flex direction='column'>
                  <Text bold= {true}>{banner.title}</Text>
                  <Text typography='t6'>{banner.subTitle}</Text>
                </Flex>
                <img src = {banner.iconUrl} width={40} height={40} alt = "" />
              </Flex>  
            </Link>
          </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default withSusepnse(EventBanner, {
  fallback : <div>로딩중 ...</div>
})