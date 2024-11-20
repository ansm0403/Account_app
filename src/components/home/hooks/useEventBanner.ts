import useAccout from "@/hook/useAccout";
import { getEventBanner } from "@/remote/banner";
import { useSuspenseQuery } from "@tanstack/react-query";


function useEventBanner(){

    const {data : account} = useAccout();

    return useSuspenseQuery({
        queryKey : ['event-banner'], 
        queryFn : () => getEventBanner({hasAccount : account != null && account.status === 'DONE'}),
    })
}

export default useEventBanner;