import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import { getMyCards } from "@/remote/card";

export default function useMyCards() {
    const user = useUser();
    
    return useQuery({
        queryKey : ["myCards", user?.id],
        queryFn : () => getMyCards(user?.id as string),
        enabled : user != null
    })
}
