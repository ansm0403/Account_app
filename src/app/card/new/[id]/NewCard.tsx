'use client'

import Form from '@/components/account/Form';
import Terms from '@/components/account/Terms';
import ProgressBar from '@/components/shared/ProgressBar';
import useUser from '@/hook/useUser';
import withAuth from '@/hook/withAuth';
import { setTerms } from '@/remote/account';
import React, { useState } from 'react'
import FullPageLoader from '../../../../components/shared/FullPageLoader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createUserCard } from '@/remote/userCard';
import { UserCard } from '@/model/card';


const FixedBottomButton = dynamic(()=>import('../../../../components/shared/FixedBottomButton')) 

const LAST_STEP = 2;

interface NewCardProps {
    cardId : string,
    initialStep : number
}

function NewCard({
    cardId,
    initialStep
} : NewCardProps
) {

    const [step, setStep] = useState(initialStep);

    const navigate = useRouter();
    const user = useUser();
    const today = new Date();

    const nextTerms = async (termIds : any) => {
        await setTerms({
            userId : user?.id as string, 
            cardId,
            termIds,
            type : "card",
        })
        
        setStep(step + 1);
    }

    const validDate = (today : Date) : string => {
        today.setFullYear(today.getFullYear() + 5);
        today.setHours(today.getHours() + 9);

        const year = today.getFullYear().toString().slice(-2);
        const month = ("0" + today.getMonth()).slice(-2)

        return `${month}/${year}`
    }

    return (
         <div>
            <ProgressBar progress={step / LAST_STEP}/>
            {   
                step === 0 
                ? <Terms onNext={{ nextTerms }}/> 
                : null
            }
            {
                step === 1
                ? <Form onNext = { async (formValues)=>{
                        const newCard = {
                            ...formValues,
                            cardNumber: (Date.now() * 1000 + Math.floor(Math.random() * 999 + 1)).toString(),
                            status : 'READY',
                            validThru : validDate(today),
                            userId : user?.id as string,
                            cardId
                        } as UserCard
                        
                        await createUserCard(newCard)

                        setStep(step + 1);
                    }}
                    type = 'card'
                />
                : null
            }
            {
                step === 2
                ? <>
                    <FullPageLoader message='카드 신청이 완료되었어요.' />
                    <FixedBottomButton label = "확인" onClick = {() => navigate.push('/')}/>
                </>
                : null
            }
        </div>
    )
}

export default withAuth(NewCard);