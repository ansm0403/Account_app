import { getEventBanner } from "@/remote/banner";
import { useQuery } from "react-query";

function useEventBanner(){
    return useQuery(
        ['event-banner'], 
        () => getEventBanner({hasAccount : false}),
        {
            suspense : true,
        }
    )
}

export default useEventBanner;