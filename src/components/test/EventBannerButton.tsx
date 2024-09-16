'use client'

import React from 'react'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { EVENT_BANNERS } from '@/mock/banner'
import { COLLECTION } from '@/constant/collection'

export default function EventBannerButton() {

    const handleButtonClick = async () => {
        const batch = writeBatch(store)

        EVENT_BANNERS.forEach((banner)=>{
            const bannerRef = doc(collection(store, COLLECTION.EVENT_BANNER))
            
            batch.set(bannerRef, banner);
        })
        await batch.commit();

        alert("배너 데이터 추가완료")
    }

  return (
    <Button onClick={handleButtonClick}>이벤트 배너 데이터 추가</Button>
  )
}
