import { getCards } from "@/remote/card";
import { useQuery } from "react-query";

export default function useCard(){
    return useQuery(['cards'], () => getCards(),{
        suspense : true,
    })
}