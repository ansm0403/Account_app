import useUser from "@/hook/useUser";
import { TransactionFilterType } from "@/model/transaction";
import { getTransactions } from "@/remote/transaction";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function useTransactions({filter} : {filter? : TransactionFilterType} = {}) {
  
    const user = useUser();

    return useSuspenseInfiniteQuery({
        queryKey : ['transaction', user?.id, filter],
        queryFn : ({pageParam}) => getTransactions({ pageParam, userId : user?.id as string, filter}),
        getNextPageParam : ({lastVisible}) => {
            return lastVisible;                            
        },
    })
}
