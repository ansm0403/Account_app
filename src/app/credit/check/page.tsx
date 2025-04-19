'use client'

import useCreditCheck, { getCreditScore } from '@/components/credit/hooks/useCreditCheck'
import FixedBottomButton from '@/components/shared/FixedBottomButton';
import FullPageLoader from '@/components/shared/FullPageLoader';
import { CHECK_STATUS } from '@/constant/credit';
import { useAlertContext } from '@/context/AlertContext';
import useUser from '@/hook/useUser';
import { updateCredit } from '@/remote/credit';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

export default function CheckPage() {

    const [readyToPoll, setReadyToPoll] = useState(true);
    const user = useUser();

    const { mutate } = useMutation({
        mutationFn : (creditScore : number) => 
            updateCredit({creditScore, userId : user?.id as string}),
    })

    const {data : status, isSuccess, isError } = useCreditCheck({
        enabled : readyToPoll
    })

    const { open } = useAlertContext();

    useEffect(()=>{
        if(isSuccess) {
            if(status === CHECK_STATUS.COMPLETE){
                setReadyToPoll(false);
                mutate(getCreditScore(200, 1000));
            }
        }

        if (isError) {
            setReadyToPoll(false);
            open({
                title : "신용점수 조회에 실패했습니다.",
                description : "잠시 후 다시 시도해주세요.",
                onButtonClick() {
                    window.history.back();
                },
            })
        }

    }, [isSuccess, isError, status, open, mutate])

    return (
        <div>
            <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'READY']} />
            {
                status === CHECK_STATUS.COMPLETE 
                ? <FixedBottomButton label = "확인" onClick={()=>{window.history.back()}}/> 
                : null
            }
        </div>
    )
}

const STATUS_CHECK_MESSAGE = {
    [CHECK_STATUS.READY] : '신용점수 조회를 준비하고 있습니다. ',
    [CHECK_STATUS.PROGRESS] : '신용점수를 조회 중입니다...',
    [CHECK_STATUS.COMPLETE] : '신용점수 조회가 완료되었습니다.',
}