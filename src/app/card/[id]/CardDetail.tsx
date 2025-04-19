'use client'

import ListRow from '@/components/shared/ListLow';
import Top from '@/components/shared/Top';
import { getCard } from '@/remote/card';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import Image from 'next/image'; 
import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text'

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Loading from '@/components/shared/Loading';

const FixedBottomButton = dynamic(()=> import('@/components/shared/FixedBottomButton'),{
    ssr : false,
})

interface Props {
    cardId : string
}

export default function DetailCard({cardId} : Props) {
    
    const { data : detailCard } = useQuery({
        queryKey : ['detail-card', cardId],
        queryFn : () => getCard(cardId),
     })

     const [ loading, setLoading ] = useState(false);
     const router = useRouter()

     if (detailCard == null) {
        return;
     }

    const {name, corpName, promotion, tags, benefit} = detailCard
     const subTitle = promotion != null ? removeHTMLTags(promotion.title) : tags.join(',');

    return (
        <div>
            <Top title = {`${corpName} ${name}`} subTitle={subTitle} />
        
            <ul>
                {benefit.map((text, index)=>(
                    <motion.li
                        key = {text}
                        initial = {{opacity : 0, translateX : -90}}
                        transition = {{ dutation : 0.7, ease : 'easeInOut', delay : index * 0.5}}
                        animate = {{ opacity : 1, translateX : 0}}
                    >
                        <ListRow 
                            as ="div" 
                            left = {
                                <Image 
                                    src = "/images/check_circle_icon.png"
                                    width = {40} 
                                    height = {40} 
                                    alt = {`check_circle_icon_${text}`}
                                />}
                            contents = {
                                <ListRow.Texts title = {`헤택 : ${index + 1}`} subTitle = {text} />
                            }  
                        />
                    </motion.li>
                ))}
            </ul>
            {
                promotion != null ? (
                    <Flex direction='column' style = {{marginTop : '80px', padding : '0 24px 80px 24px'}}>
                        <Text>유의사항</Text>
                        <Text typography='t7'>{removeHTMLTags(promotion.terms)}</Text>
                    </Flex>
                ) : null
            }
            <FixedBottomButton
                label = "1분만에 신청하고 혜택받기"
                onClick={()=>{
                    setLoading(true);
                    router.push(`/card/new/${cardId}`)
                }}
            />
            {
                loading && <Loading />
            }
        </div>
    )
}

function removeHTMLTags(text : string) {
    return text.replace(/<\/?[^>]+(>|$)/g, '')
}
