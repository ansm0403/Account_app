'use client'

import { getCard } from '@/remote/card';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
 
interface Props {
    cardId : string
}

export default function CardDetailPage({cardId} : Props) {
    
    const { data : detailCard } = useQuery({
        queryKey : ['detail-card'],
        queryFn : () => getCard(cardId),
     })

    console.log(detailCard);
    
    return (
        <div>CardDetail</div>
    )
}
