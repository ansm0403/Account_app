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
import useAccount from '@/hook/useAccount';
import { createUserCard } from '@/remote/userCard';
import { UserCard } from '@/model/card';


const FixedBottomButton = dynamic(()=>import('../shared/FixedBottomButton')) 

const LAST_STEP = 2;

function NewAccount({initialStep} : {initialStep : number}) {

    const [step, setStep] = useState(initialStep);
    const { refetch } = useAccount();

    const navigate = useRouter();
    const user = useUser();
    const today = new Date();

    const nextTerms = async (termIds : any) => {
        await setTerms({
            userId : user?.id as string, 
            termIds,
            type : "account",
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
                        const cardNumber = (Date.now() * 1000 + Math.floor(Math.random() * 999 + 1)).toString();
                        const validThru = validDate(today);

                        const newAccount = {
                            ...formValues,
                            accountNumber: Date.now().toString(),
                            cardNumber, 
                            balance : 0,
                            validThru,
                            status : 'READY',
                            userId : user?.id as string,
                        } as Account

                        const newCard = {
                            ...formValues,
                            cardNumber,
                            cardName : formValues.accountName,
                            status : 'READY',
                            validThru,
                            type : "체크카드", 
                            userId : user?.id as string,
                            cardId : (Date.now() * 10 + Math.floor(Math.random() * 999 + 1)).toString()
                        } as UserCard
                        
                        await createAccount(newAccount)
                        await createUserCard(newCard)

                        setStep(step + 1);
                        
                        setTimeout(async () => {
                            await createAccount({ ...newAccount, status : 'DONE' })
                            refetch();
                        }, 7000)
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