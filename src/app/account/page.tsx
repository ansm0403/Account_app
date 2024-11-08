'use client'

import Terms from '@/components/account/Terms';
import ProgressBar from '@/components/shared/ProgressBar';
import withAuth from '@/hook/withAuth';
import React, { useState } from 'react'

const LAST_STEP = 2;

function AccountPage() {
  
    const [step, setStep] = useState(0);
    
    return (
        <div>
            <ProgressBar progress={step / LAST_STEP}/>

            {step === 0 ? <Terms onNext={(termIds) => {
                console.log(termIds);
            }}/> : null}
        </div>
    )
}
export default withAuth(AccountPage);