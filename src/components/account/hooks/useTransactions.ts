import useUser from "@/hook/useUser";
import { getTransactions } from "@/remote/transaction";
import { useInfiniteQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function useTransactions() {
  
    const user = useUser();

    return useInfiniteQuery({
        queryKey : ['transaction', user?.id],
        queryFn : ({pageParam}) => getTransactions({ pageParam, userId : user?.id as string}),
        getNextPageParam : ({lastVisible}) => {
            return lastVisible;                            
        },
    })
}
