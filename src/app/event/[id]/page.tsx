
import PreviewContainer from '@/components/event/PreviewContainer';
import { getEvent } from '@/remote/event';
import React from 'react'

type Props = {
    params : {id : string}
}

export default async function EventPage({params : {id}} : Props) {

    const event = await getEvent(id);

    return (
        <PreviewContainer EventData={event} id = {id} />
  )
}
