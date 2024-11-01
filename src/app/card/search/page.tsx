'use client'

import Badge from '@/components/shared/Badge';
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListLow';
import Top from '@/components/shared/Top'
import { getSearchCard } from '@/remote/card';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import Text from '@/components/shared/Text'
import useDebounce from '@/components/shared/hook/useDebounce';
import { useQuery } from '@tanstack/react-query';

export default function SearchPage() {
  
    const [keyword, setKeyword] = useState('')
    const debouncedKeyword  = useDebounce(keyword);

    console.log("debounce : ", debouncedKeyword);
    
    const navigate = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const {data} = useQuery({
        queryKey : ['search-cards'],
        queryFn : () => getSearchCard(debouncedKeyword),
        enabled : debouncedKeyword !== '',
    })

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus();
        }
    },[])

    console.log("keyword : ", keyword);
    console.log("search : ", data);
    
    const handlekeyword = useCallback((e : ChangeEvent<HTMLInputElement>)=>{
        setKeyword(e.target.value);
    }, [])

    return (
    <div>
        <Top title = "추천카드" subTitle = "회원님을 위해 준비했어요." />
            <div style = {{padding : "0 24px 12px 24px"}}>
                <Input ref = {inputRef} onChange={handlekeyword}/>
            </div>

        {keyword !== '' && data?.length === 0 ? (
            <div style = {{padding : "24px"}}>
                <Text>찾으시는 카드가 없습니다.</Text>
            </div>
        ) : (
            <ul>
                {
                    data?.map((card, index) => (
                    <ListRow 
                        key = {card.id} 
                        contents = {<ListRow.Texts title = {`${index + 1}위`} subTitle = {card.name} />} 
                        right = {card.payback != null ? <Badge label = {card.payback} /> : null}
                        withArrow = {true}
                        onClick={()=>{
                        navigate.push('/card/${card.id}')
                        }}
                    />))
                }
                </ul>
        )}
    </div>
  )
}
