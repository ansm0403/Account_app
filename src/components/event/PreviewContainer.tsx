'use client'
import { useAlertContext } from '@/context/AlertContext';
import { getEvent } from '@/remote/event';
import { useQuery } from '@tanstack/react-query';
import { isAfter, parseISO } from 'date-fns';
import React from 'react'
import Preview from './Preview';
import { Event } from '@/model/Event';

interface Props {
    EventData : Event
    id : string
}

export default function PreviewContainer({EventData, id} : Props) {
    const {open} = useAlertContext(); 

    const {data} = useQuery({
        queryKey : ["event", id],
        queryFn : () => getEvent(id),
        initialData : EventData,
        select : (event) => {

            const isEndEvent = isAfter(new Date(), parseISO(event.endDate))
        
            if(isEndEvent) {
                open({
                    title : `${event.title} 이벤트가 종료되었어요`,
                    description : "다음에 더 좋은 이벤트로 찾아오겠습니다.",
                    onButtonClick : () => {
                        window.history.back();
                    }
                })
            }
        }
    })

    return (
        <Preview data = {EventData} mode = 'preview' />
  )
}
