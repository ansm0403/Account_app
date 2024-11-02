import { getCard } from "@/remote/card";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DetailCard from "./CardDetail";


type Props = {
    params : {id : string}
}

export default async function CardDetailPage({params : {id}} : Props){
    
    const client = new QueryClient();
    
    await client.prefetchQuery({
       queryKey : ['detail-card', id],
       queryFn : () => getCard(id),
    })


    return(
        <HydrationBoundary state = {dehydrate(client)}>
            <DetailCard cardId={id}/>
        </HydrationBoundary>
    )
}

