'use client'

import withSuspense from '@/hook/withSuspense'
import React from 'react'
import useTransactions from './hooks/useTransactions'
import Text from '../shared/Text';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListLow';
import { format, parseISO } from 'date-fns';
import addDelimiter from '@/utils/addDelimiter';
import { Transaction } from '@/model/transaction';
import Link from 'next/link';
import Button from '../shared/Button';

function Transactions() {

    const { data } = useTransactions();

    const transactions = data?.pages
    .map(({items}) => items)
    .flat() as Transaction[]

    return (
        <div>
            <Text bold = {true} style = {{padding : 24}}>입출금 내역</Text>
        
            {
                transactions?.length === 0 
                ? (
                    <Flex style = {{padding : 24}}>
                        <Text>아직 입출금 내역이 없어요.</Text>
                    </Flex>
                )
                : (
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
                )
            }
            <Link href = "/account/transaction">
                <Button full = {true} size = "medium" weak={true}>
                    자세히 보기
                </Button>
            </Link>
        </div> 
    )
}

export default withSuspense(Transactions, {
    fallback : <div>로딩 중 입니다...</div>
})