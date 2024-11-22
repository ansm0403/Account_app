'use client'

import React from 'react'
import ListRow from '../shared/ListLow'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PiggyBankRow() {

  const navigate = useRouter();

  return (
    <div>
      <ul>
        <ListRow 
          left = {
            <Image 
              src = "https://www.iconfinder.com/icons/61480/cash_money_pig_piggy%20bank_savings_icon" 
              width = {40}
              height={40}
              alt = "piggy Bank"
            />
          } 
          contents = {
            <ListRow.Texts title = "저금통" subTitle = "매일 매일 조금씩 저금하여 금액을 모아요."/>
          }
          withArrow = {true}
          onClick={()=>{
            navigate.push('/account/piggybank/new')
          }}
        />
      </ul>
    </div>
  )
}
