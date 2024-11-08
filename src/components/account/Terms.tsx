'use client'

import { 약관목록 } from '@/constant/account';
import { Term } from '@/model/account';
import React, { useState, MouseEvent } from 'react'
import Agreement from '../shared/Agreement';
import FixedBottomButton from '../shared/FixedBottomButton';

interface Props {
    onNext : (termsIds : string[]) => void
}

export default function Terms({onNext} : Props) {
  
    const [termsAgreement, setTermsAgreement] = useState(()=>
        generateInitialValues(약관목록)
    );
    
    const handleAgreement = (id : string, checked : boolean) => {
        setTermsAgreement((prevTerms) => {
            return prevTerms.map((term) =>
                term.id === id ? {...term, checked} : term, 
            )
        })
    }

    const handleAllAgreement = (e : MouseEvent<HTMLElement>, checked : boolean) => {
        setTermsAgreement((prevTerms) => {
            return prevTerms.map((term) => ({...term, checked}))
        })
    }

    const isAllTermsTrue = termsAgreement.every((term) => term.checked)
   
    const isAllEssentialTermsTrue = termsAgreement
    .filter((term) => term.mandatory)
    .every((term )=> term.checked)

    return (
        <div>
            <Agreement>
                <Agreement.Title checked={isAllTermsTrue} onChange={handleAllAgreement}>
                    약관 모두 동의
                </Agreement.Title>
                {
                    termsAgreement.map((term)=>(
                        <Agreement.Description 
                            key = {term.id} 
                            link = {term.link}
                            checked = {term.checked}
                            onChange={(_, checked) => handleAgreement(term.id, checked)}
                        >
                            {term.mandatory ? "[필수]" : "[선택]"} {term.title}
                        </Agreement.Description>
                    ))
                }
            </Agreement>
            <FixedBottomButton 
                label = "약관동의"
                disabled = {isAllEssentialTermsTrue === false}
                onClick={()=>{
                    onNext(
                        termsAgreement
                        .filter((term) => term.checked)
                        .map(( { id }) => id)
                    )
                }}
            />
        </div>
    )
}

function generateInitialValues(terms : Term[]){
    return terms.map((term) => ({...term, checked : false}))
}