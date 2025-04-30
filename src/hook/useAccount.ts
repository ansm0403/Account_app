import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import { getAccount } from "@/remote/account";

export default function useAccount() {

    const user = useUser();

    return useQuery({
        queryKey : ["account", user?.id],
        queryFn : () => getAccount(user?.id as string),
        enabled : user != null,
    }) 
}
