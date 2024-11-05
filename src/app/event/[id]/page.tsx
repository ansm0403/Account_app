import Preview from '@/components/event/Preview';
import { getEvent } from '@/remote/event';
import React from 'react'

type Props = {
    params : {id : string}
}

export default async function EventPage({params : {id}} : Props) {

    const event = await getEvent(id);

    return (
        <Preview EventData = {event} id = {id}/>
  )
}
