
import { getCards } from "@/remote/card"

import CardList from "./CardList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

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
        <div>
            <HydrationBoundary state={dehydrateState}>
                <CardList />
            </HydrationBoundary>
        </div>
    )
}


