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
        value : '입금'
    },
    {
        label : '출금',
        value : '출금'
    },
    {
        label : '송금',
        value : '송금'
    },
    {
        label : '수취',
        value : '수취'
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


    return (
        <div>
            <Flex as = 'ul' justify='flex-end' style = {{padding : 24}}>
                {FILTER.map((filter)=>(
                    <li style = {{padding : "0 5px"}} key = {filter.value} onClick={()=>setCurrentFilter(filter.value)}>
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
                            const isDeposit = transaction.type === '입금' || transaction.type === '수취';

                            return(
                                <ListRow 
                                    key = {transaction.date}
                                    contents = {
                                        <ListRow.Texts 
                                            title = {
                                                <div>
                                                    {transaction.displayText}
                                                    <span style = {{fontSize : "0.8rem", color : "gray", marginLeft : "0.5rem"}}>{`${transaction.accountNumber}`}</span>
                                                </div>
                                            } 
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