'use client'

import Badge from "@/components/shared/Badge";
import Input from "@/components/shared/Input";
import ListRow from "@/components/shared/ListLow";
import Loading from "@/components/shared/Loading";
import Top from "@/components/shared/Top";

import { getCards } from "@/remote/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


export default function CardList() {

    const { data, hasNextPage = false, fetchNextPage, isFetching } = useInfiniteQuery({
        queryKey : ['scroll-cards'],
        queryFn : ( {pageParam} ) => getCards(pageParam),
        getNextPageParam: ({lastVisible}) => {
            return lastVisible;                            
        },
    })
    
    const [loading, setLoading] = useState(false);
      
    const navigate = useRouter()
    
      
    const loadMore = useCallback(() => {
        if (hasNextPage === false || isFetching) {
          return
        }
        fetchNextPage()
    }, [hasNextPage, fetchNextPage, isFetching])
    
      
    if (data == null) {
        return null
    }
    

    const cards = data?.pages.map(({ items }) => items).flat()

    return (
        <div>
            <Top title = "추천카드" subTitle = "회원님을 위해 준비했어요." />
            <div style = {{padding : "0 24px 12px 24px"}}>
                <Input onFocus={()=>{
                    navigate.push('/card/search')
                }}/>
            </div>
            <InfiniteScroll 
                dataLength={cards.length} 
                hasMore = {hasNextPage}
                loader = {<ListRow.Skeleton></ListRow.Skeleton>}   
                next={loadMore} 
                scrollThreshold="100px"
            >
                <ul>
                {
                cards.map((card, index) => (
                <ListRow 
                    key = {card.id} 
                    contents = {<ListRow.Texts title = {`${index + 1}위`} subTitle = {card.name} />} 
                    right = {card.payback != null ? <Badge label = {card.payback} /> : null}
                    withArrow = {true}
                    onClick={()=>{
                        setLoading(true);
                        navigate.push(`/card/${card.id}`)
                    }}
                />))
                }
                </ul>
            </InfiniteScroll>
            { loading && <Loading /> }
        </div>
    )
}
