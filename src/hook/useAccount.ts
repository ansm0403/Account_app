import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import useUser from "./useUser";
import { Account } from "@/model/account";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { store } from "@/remote/firebase";
import { COLLECTION } from "@/constant/collection";
import { AccountSnapshot } from "@/remote/account";

export default function useAccount() : UseQueryResult<AccountSnapshot[] | null>{

    const user = useUser();
    const queryClient = useQueryClient();
    const queryKey = ["account", user?.id];

    return useQuery({
        queryKey,
        queryFn : () => {
            return new Promise((res) => {
                const accountQuery = query(
                    collection(store, COLLECTION.ACCOUNT),
                    where("userId", "==", user?.id)
                )

                const unsubscribe = onSnapshot(accountQuery, (snapshot) => {
                    const accounts = snapshot.empty 
                    ? null 
                    : snapshot.docs.map((doc)=>({
                        id : doc.id,
                        ...doc.data() as Account,
                    })) 
                    res(accounts);
                    queryClient.setQueryData(queryKey, accounts);
                })
                return () => unsubscribe();
            }
        )},
        refetchOnMount : false, 
        refetchOnWindowFocus : false,
        refetchOnReconnect : false,
        staleTime : Infinity,
        enabled : user != null
    })
}

