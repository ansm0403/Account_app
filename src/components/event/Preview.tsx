'use client'

import { Event } from '@/model/Event'
import React, { useState } from 'react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import FixedBottomButton from '../shared/FixedBottomButton'
import { useRouter } from 'next/navigation'
// import styles from "../../app/global.css"
import Button from '../shared/Button'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Loading from '../shared/Loading'

interface Props {
    data : Event
    mode : 'preview' | 'edit'
}

const exp = ` ## 계좌개설 이벤트

혜택1) 개설축하금 5천원

* 개설완료 즉시 입출금통장에 5천원 지급

- 계좌개설 최초 신규고객에 한함 (주민등록번호 기준)



혜택2) 해외주식 매매수수료 및 환전 우대 + 미국주식 실시간 시세 무료

- 매매수수료 0.1% (미국/온라인 기준), 환전 우대 최대 95% (미국 기준)

- 미국 주식 실시간 서비스 1년간 무료

- 계좌개설 최초 신규고객에 한함 (주민등록번호 기준)

혜택 3) 해외주식 거래 시 1만원 지급 이벤트

- 이벤트 기간 내 해외주식 누적 거래 USD 1천달러 이상 시 주식계좌로 입금

- 해당 계좌 해외주식 최초 거래 고객 대상





![](https://m.hanabank.com/cont/event/new/event01/__icsFiles/afieldfile/2022/07/08/oneq_cheerup_evt_sns.jpg)`

export default function Preview({data, mode} : Props) {
    
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);

    const {title, subTitle, buttonLabels, link} = data

    return (
        <>
            <Flex direction='column'>
                <Flex style = {{padding : '12px 24px'}} direction='column'>
                    <Text bold={true}>{title}</Text>
                    <Text typography='t6'>{subTitle}</Text>
                </Flex>
            </Flex>
            <div>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {exp}
                </Markdown>
            </div>
            <Flex>
                {
                    mode === 'preview' ? (
                        <FixedBottomButton 
                            label = {buttonLabels} 
                            onClick = {()=>{
                                setLoading(true);
                                router.push(link)
                            }} 
                        />
                    ) : (
                        <Button>{buttonLabels}</Button>
                    )
                }    
            </Flex>
            { 
                loading && <Loading />
            }
        </>
    )
}
