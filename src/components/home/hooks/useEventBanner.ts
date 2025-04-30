import useAccount from "@/hook/useAccount";
import { getEventBanner } from "@/remote/banner";
import { useSuspenseQuery } from "@tanstack/react-query";


function useEventBanner(){

    const {data : account} = useAccount();

    return useSuspenseQuery({
        queryKey : ['event-banner'], 
        queryFn : () => getEventBanner({hasAccount : account != null && account.status === 'DONE'}),
    })
}

export default useEventBanner;