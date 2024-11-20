'use client'

import withAuth from '@/hook/withAuth'
import React from 'react'
import useTransactions from './hooks/useTransactions'

function TransactionPage() {

    const { data } = useTransactions();

    console.log("transaction : ", data);
    

    return (
        <div>TransactionPage</div>
    )
}

export default withAuth(TransactionPage)