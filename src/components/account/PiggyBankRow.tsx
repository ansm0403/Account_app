'use client'

import React from 'react'
import ListRow from '../shared/ListLow'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import withSusepnse from '@/hook/withSuspense'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getPiggybank } from '@/remote/piggybank'
import useUser from '@/hook/useUser'
import { differenceInDays } from 'date-fns'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import addDelimiter from '@/utils/addDelimiter'

function PiggyBankRow() {

  const navigate = useRouter();
  const user = useUser();

  const { data } = useSuspenseQuery({
    queryKey : ['piggybank', user?.id],
    queryFn : () => getPiggybank(user?.id as string),
  })

  console.log(data);
  
  if(data == null) {
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

  const { balance, endDate, goalAmount } = data
  
  const dDay = differenceInDays(endDate, new Date());


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
              <Flex direction='column'>
                <Text typography='t4' bold = {true} >D-{dDay}</Text>
                <Text>{addDelimiter(goalAmount - balance)}원 남았어요.</Text>
              </Flex>
            }
            withArrow = {true}
            // onClick={()=>{
            //   저금통 상세보기 및 저금통 리스트로 확장
            // }}
          />
        </ul>
      </div>
  )
}

export default withSusepnse(PiggyBankRow, {
  fallback : <div>로딩 중 ...</div>
});