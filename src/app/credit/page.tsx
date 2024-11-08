'use client'

import useCredit from '@/components/credit/hooks/useCredit';
import CreditScoreGraph from '@/components/shared/CreditScoreGraph';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListLow';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import { useAlertContext } from '@/context/AlertContext';
import useUser from '@/hook/useUser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

const FixedBottomButton = dynamic(() => import('@/components/shared/FixedBottomButton'), {
    ssr : false
})

export default function CreditPage() {

    const user = useUser();
    const {open} = useAlertContext();
    const navigate = useRouter();

    const { data : credit } = useCredit(); 

    const handleCheck = useCallback(()=>{
        if(user == null){
            open({
                title : "로그인이 필요합니다",
                description : "정확한 신용정보 확인을 위해 로그인을 해주세요.",
                onButtonClick : () => {
                    navigate.push('/auth/signin');
                }
            })
            return
        }

        navigate.push('/credit/check');

    },[user, navigate, open])

    return credit != null ? (
        <div>
            <Spacing size = {40} />
            <Flex align='center' direction='column'>
                <Text typography='t4' bold = {true} textAlign='center'>
                    나의 신용점수
                </Text>
                <Spacing size={10} />
                <CreditScoreGraph score={credit.creditScore} />
            </Flex>
            <Spacing size={80} />
            <ul>
                <ListRow contents = {
                        <ListRow.Texts
                            title = "추천카드"
                            subTitle = "나에게 맞는 카드 찾아보기"
                        />
                    } 
                    withArrow = {true}
                    onClick={() => (navigate.push('/card'))}
                />
            </ul>
            <FixedBottomButton label='신용점수 올리기' onClick={handleCheck} />
        </div>
    ) : (
        <div>
            <Spacing size = {40} />
            <Flex align='center' direction='column'>
                <Text typography='t4' bold = {true} textAlign='center'>
                    내 신용점수를 <br />
                    조회하고 관리해보세요.
                </Text>
                <Spacing size={10} />
                <CreditScoreGraph score={0} />
            </Flex>
            <Spacing size={80} />
            <ul>
                <ListRow contents = {
                        <ListRow.Texts 
                            title = "정확한 신용평점" 
                            subTitle = "대표 신용평가 기관의 데이터로 관리해요" 
                        />
                    }
                />
                 <ListRow contents = {
                        <ListRow.Texts 
                            title = "신용점수 무료 조회" 
                            subTitle = "신용점수에 영향없이 무료로 조회가 가능해요" 
                        />
                    }
                />
            </ul>
            <FixedBottomButton label = "30초만에 신용점수 확인하기" onClick={handleCheck}/>
        </div>
    )
}
