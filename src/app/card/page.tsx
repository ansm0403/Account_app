
import { getCards } from "@/remote/card"

import CardList from "./CardList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function CardListPage(){

    const client = new QueryClient()

    client.prefetchInfiniteQuery({
        queryKey : ['cards'],
        queryFn : () => getCards(),
        initialPageParam : undefined,
    })

    const dehydrateState = dehydrate(client);

    console.log(dehydrateState.queries);

    return (
        <div>
            <HydrationBoundary state={dehydrateState}>
                <CardList />
            </HydrationBoundary>
        </div>
    )
}

