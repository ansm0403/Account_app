'use client'
import { COLLECTION } from '@/constant/collection';
import { card_list } from '@/mock/card';
import { store } from '@/remote/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore'
import React from 'react'
import Button from '../shared/Button';

export default function CardListButton() {
    const handleButtonClick = async () => {
        const batch = writeBatch(store);
        
        card_list.forEach((card)=>{
            const docRef = doc(collection(store, COLLECTION.CARD))

            batch.set(docRef, card);
        })

        await batch.commit();

        alert("카드 데이터 추가 완료")
    }
  return (
    <Button onClick={handleButtonClick}>카드 리스트 추가</Button>
  )
}
