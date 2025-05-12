'use client'

import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import ArrowBack from '@components/icons/ArrowBack';
import ArrowNext from '@components/icons/ArrowNext';

interface SwiperProps {
    isFirst? : boolean,
    isEnd? : boolean
}

export default function SwiperNavigation({
    children
} : {
    children : ReactNode;
}) {

    const [ isFirst, setIsFirst ] = useState<boolean>(true);
    const [ isEnd, setIsEnd ] = useState<boolean>(false);
    
    return (
        <SwiperContainer isFirst = {isFirst} isEnd = {isEnd}>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                navigation = {{
                    nextEl : '.swiper-button-prev',
                    prevEl : '.swiper-button-next',
                }}
                onSlideChange={(e)=>{
                    setIsFirst(e.isBeginning);
                    setIsEnd(e.isEnd);
                }}
            >
                {children}
                <button className = 'swiper-button-prev'>
                    <ArrowBack />
                </button>
                <button className = 'swiper-button-next'>
                    <ArrowNext />
                </button>
            </Swiper>
        </SwiperContainer>
    )
}

const SwiperContainer = styled.div<SwiperProps>`
    position : relative;
    
    .swiper-button-prev, .swiper-button-next{
        position : absolute;
        top : 40%;
        font-size : 2.5rem;
        opacity : 30%;
        z-index : 50;
        transition : transform 0.2s;
    }

    .swiper-button-prev {
        ${(props) => (
            !props.isEnd && (`
                cursor : pointer;
                :hover {
                    opacity : 60%;
                    transform : scale(110%);
                }
            `)
        )}
        left : 12px;
    }
    .swiper-button-next {
        ${(props) => (
            !props.isFirst && (`
                cursor : pointer;
                :hover {
                    opacity : 60%;
                    transform : scale(110%);
                }
            `)
        )}
        right : 12px;
    }
`