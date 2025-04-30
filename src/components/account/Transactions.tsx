'use client'

import withSuspense from '@/hook/withSuspense'
import React, { useState } from 'react'
import useTransactions from './hooks/useTransactions'
import Text from '../shared/Text';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListLow';
import { format, parseISO } from 'date-fns';
import addDelimiter from '@/utils/addDelimiter';
import { Transaction } from '@/model/transaction';
import Link from 'next/link';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';
import Loading from '../shared/Loading';

function Transactions() {

    const { data } = useTransactions();
    const [loading, setLoading] = useState(false);

    const transactions = data?.pages
    .map(({items}) => items)
    .flat() as Transaction[]

    return (
        <div style = {{paddingTop : 24}} >
            <Text bold = {true} style = {{padding : 24}}>입출금 내역</Text>
            <Spacing size = {20}/>
            {
                transactions?.length === 0 
                ? (
                    <Flex style = {{padding : 24}}>
                        <Text>아직 입출금 내역이 없어요.</Text>
                    </Flex>
                )
                : (
                    <ul style = {{marginLeft : 18}} >
                        {
                            transactions.slice(0, 5)?.map((transaction)=>{
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
             <Spacing size = {30}/>
            <Link href = "/account/transaction" onClick={()=>{setLoading(true)}}>
                <Button full = {true} size = "medium" weak={true}>
                    자세히 보기
                </Button>
            </Link>
            {
                loading && <Loading />
            }
        </div> 
    )
}

export default withSuspense(Transactions, {
    fallback : <div>로딩 중 입니다...</div>
})