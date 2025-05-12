'use client'

import TransactionForm from '@/components/test/TransactionForm'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import withAuth from '@/hook/withAuth'
import useAccount from '@/hook/useAccount'
import LoadingPortal from '@/components/shared/ModalPortal'
import Modal from '@/components/shared/Modal'
import { useRouter } from 'next/navigation'
import Loading from '@/components/shared/Loading'

function DepositWithdrawPage() {

  const { data : accounts } = useAccount();
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);

  return (
    <Container>
         {
            !accounts ? (
                <LoadingPortal>
                    <Modal 
                        title = "계좌를 생성해주세요."
                        buttonLabel = "확인"
                        onClose={()=>{ 
                            setLoading(true);
                            router.push('/') 
                        }}
                     />
                </LoadingPortal>
            ) : (
              <TransactionForm type = "deposit-withdraw" accounts={accounts}/>
            )
          }
          {
                loading && <Loading />
          }
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    justify-content : center;
`
export default withAuth(DepositWithdrawPage);