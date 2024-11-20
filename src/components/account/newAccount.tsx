'use client'

import Form from '@/components/account/Form';
import Terms from '@/components/account/Terms';
import ProgressBar from '@/components/shared/ProgressBar';
import useUser from '@/hook/useUser';
import withAuth from '@/hook/withAuth';
import { Account } from '@/model/account';
import { createAccount, setTerms } from '@/remote/account';
import React, { useState } from 'react'
import FullPageLoader from '../shared/FullPageLoader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';


const FixedBottomButton = dynamic(()=>import('../shared/FixedBottomButton')) 

const LAST_STEP = 2;

function NewAccount({initialStep} : {initialStep : number}) {

    const [step, setStep] = useState(initialStep);

    const navigate = useRouter();
    const user = useUser();

    return (
         <div>
            <ProgressBar progress={step / LAST_STEP}/>
            {   
                step === 0 
                ? <Terms onNext={ async (termIds) => {
                    await setTerms({userId : user?.id as string, termIds})
                    
                    setStep(step + 1);
                }}/> 
                : null
            }
            {
                step === 1
                ? <Form onNext = { async (formValues)=>{
                        const newAccount = {
                            ...formValues,
                            accountNumber: Date.now(),
                            balance : 0,
                            status : 'READY',
                            userId : user?.id as string,
                        } as Account
                        
                        await createAccount(newAccount)

                        setStep(step + 1);
                    }}
                />
                : null
            }
            {
                step === 2
                ? <>
                    <FullPageLoader message='계좌개설 신청이 완료되었어요.' />
                    <FixedBottomButton label = "확인" onClick = {() => navigate.push('/')}/>
                </>
                : null
            }
        </div>
    )
}

export default withAuth(NewAccount);