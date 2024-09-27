'use client'
import Badge from "@/components/shared/Badge";
import ListRow from "@/components/shared/ListLow";
import { getCards } from "@/remote/card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";

export default function CardListPage(){
    const {data, hasNextPage = false, fetchNextPage, isFetching} = useInfiniteQuery(
        ['cards'], 
        ({pageParam}) => getCards(pageParam), {
        getNextPageParam : (snapshot) => {
            return snapshot.lastVisible
        }
    } )
    console.log('data', data);

    const navigate = useRouter();

    const loadMore = useCallback(()=>{
        if(hasNextPage === false || isFetching) {
            return
        }
        fetchNextPage()
    },[hasNextPage, fetchNextPage, isFetching])

    if(data == null) {
        return null
    }
    const cards = data?.pages.map(({items}) => items).flat();

    return (
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
                navigate.push('/card/${card.id}')
                }}
            />))
            }
            </ul>
        </InfiniteScroll>
    )
}

export async function getDehydrateProps(){
    console.log("ㅋㅋㅋㅋ");

    const client = new QueryClient()

    client.prefetchInfiniteQuery(['cards'], ()=>getCards());

    return {
        props : {
            dehydrateState : JSON.parse(JSON.stringify(dehydrate(client)))
        }
    }
}