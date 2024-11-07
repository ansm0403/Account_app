import { CHECK_STATUS } from '@/constant/credit'
import { useQuery } from '@tanstack/react-query'

interface useCreditProps {
    enabled : boolean
}

export default function useCreditCheck({enabled} : useCreditProps) {
    
    return useQuery({
        queryKey : ['useCreditCheck'],
        queryFn : () => getCheckStatus(),
        enabled,
        refetchInterval : 2000,
        staleTime : 0,
    })
  
}

function getCheckStatus() {
    const values = [
        CHECK_STATUS.READY,
        CHECK_STATUS.PROGRESS,
        CHECK_STATUS.COMPLETE,
        CHECK_STATUS.REJECT,
    ]

    const status = values[Math.floor(Math.floor(Math.random()*values.length))];

    if(status === CHECK_STATUS.REJECT){
        throw new Error("신용점수 조회에 실패했습니다.");
    }

    return status;
}

export function getCreditScore(min : number, max : number) : number{
    return Math.floor(Math.random() * (max - min +1)) + min
}