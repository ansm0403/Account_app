import { getEventBanner } from "@/remote/banner";
import { useSuspenseQuery } from "@tanstack/react-query";


function useEventBanner(){
    return useSuspenseQuery({
        queryKey : ['event-banner'], 
        queryFn : () => getEventBanner({hasAccount : false}),
    })
}

export default useEventBanner;