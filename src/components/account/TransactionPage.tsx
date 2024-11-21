'use client'

import withAuth from '@/hook/withAuth'
import React, { useCallback, useState } from 'react'
import useTransactions from './hooks/useTransactions'
import InfiniteScroll from 'react-infinite-scroll-component';
import ListRow from '../shared/ListLow';
import { format, parseISO } from 'date-fns';
import Flex from '../shared/Flex';
import addDelimiter from '@/utils/addDelimiter';
import Text from '../shared/Text';
import { Transaction, TransactionFilterType } from '@/model/transaction';

const FILTER : 
    Array<{label : string; value : TransactionFilterType}> = 
[
    {
        label : '전체',
        value : 'all'
    },
    {
        label : '입금',
        value : 'deposit'
    },
    {
        label : '출금',
        value : 'withdraw'
    }
]

function TransactionPage() {

    const [currentFilter, setCurrentFilter] = useState<TransactionFilterType>('all');

    const { data, hasNextPage = false, isFetching, fetchNextPage } = useTransactions({filter : currentFilter});

   
    const loadMore = useCallback(() => {
        if(hasNextPage === false || isFetching) return
        
        fetchNextPage();
    },[hasNextPage, fetchNextPage, isFetching])


    const transactions = data?.pages.map(({items}) => items).flat() as Transaction[];

    console.log("transaction : ", data);
    
    return (
        <div>
            <Flex as = 'ul' justify='flex-end' style = {{padding : 24}}>
                {FILTER.map((filter)=>(
                    <li key = {filter.value} onClick={()=>setCurrentFilter(filter.value)}>
                        {filter.label}
                    </li>
                ))}
            </Flex>
            <InfiniteScroll 
                dataLength={transactions.length} 
                hasMore = {hasNextPage} 
                loader = {<></>} 
                next = {loadMore}
            >
                <ul>
                    {
                        transactions?.map((transaction)=>{
                            const isDeposit = transaction.type === 'deposit';

                            return(
                                <ListRow 
                                    key = {transaction.userId}
                                    contents = {
                                        <ListRow.Texts 
                                            title = {transaction.displayText} 
                                            subTitle = {format(
                                                parseISO(transaction.date),
                                                'yyyy-MM-dd HH:mm:SS',
                                            )}
                                            />
                                    }
                                    right = {
                                        <Flex direction='column' align='flex-end'>
                                            <Text color = {isDeposit ? 'blue' : 'red'} bold = {true}>
                                                {isDeposit ? '+' : '-'} {addDelimiter(transaction.amount)}원
                                            </Text>
                                            <Text>{addDelimiter(transaction.balance)}원</Text>
                                        </Flex>
                                    }
                                />
                            )    
                        })
                    }
                </ul>
            </InfiniteScroll>
        </div>
    )
}

export default withAuth(TransactionPage)