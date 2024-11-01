import { getCards } from "@/remote/card";
import { useSuspenseQuery } from "@tanstack/react-query";



export default function useCard(){
    return useSuspenseQuery({
        queryKey : ['home-cards'], 
        queryFn : () => getCards(),
    })
}

