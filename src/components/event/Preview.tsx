'use client'

import { Event } from '@/model/Event'
import React from 'react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import FixedBottomButton from '../shared/FixedBottomButton'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import "../../app/global.css"
import Button from '../shared/Button'

interface Props {
    data : Event
    mode : 'preview' | 'edit'
}

export default function Preview({data, mode} : Props) {
    
    const router = useRouter();

    const {title, subTitle, buttonLabels, link, contents} = data


    return (
        <Flex direction='column'>
            <Flex style = {{padding : '12px 24px'}} direction='column'>
                <Text bold={true}>{title}</Text>
                <Text typography='t6'>{subTitle}</Text>
            </Flex>

            <div className = "markdownContainer">
                <ReactMarkdown>
                    {contents}
                </ReactMarkdown>
            </div>

            {
                mode === 'preview' ? (
                    <FixedBottomButton 
                        label = {buttonLabels} 
                        onClick = {()=>{
                            router.push(link)
                        }} 
                    />
                ) : (
                    <Button>{buttonLabels}</Button>
                )
            }

            
        </Flex>
    )
}
