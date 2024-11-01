import { getCard } from "@/remote/card";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params : {id : string}
}

export default async function CardDetailPage({params : {id}} : Props){
    
    const client = new QueryClient();
    
    await client.prefetchQuery({
       queryKey : ['detail-card'],
       queryFn : () => getCard(id),
    })

    return(
        <HydrationBoundary state = {client}>
            <CardDetailPage cardId = {id}/>
        </HydrationBoundary>
    )
}

