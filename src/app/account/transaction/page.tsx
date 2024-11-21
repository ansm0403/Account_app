
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TransactionPage from '@/components/account/TransactionPage'
import { User } from '@/model/user';
import { getTransactions } from '@/remote/transaction';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function TransactionMainPage() {

    const session = await getServerSession(authOptions);

    if(session != null && session.user != null) {
        const client = new QueryClient();

        const userId = (session.user as User).id;

        client.prefetchInfiniteQuery({
            queryKey : ['transaction', userId, 'all'],
            queryFn : () => getTransactions({userId}),
            initialPageParam : undefined,
        })

        return(
            <HydrationBoundary state = {dehydrate(client)}>
                <TransactionPage />
            </HydrationBoundary>
        )
    }

    return <></>
}