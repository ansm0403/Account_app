'use client'

import { ChangeEvent, useState } from "react"
import Flex from "../shared/Flex"
import TextField from "../shared/TextField"
import Select from "../shared/Select"
import Spacing from "../shared/Spacing"
import Button from "../shared/Button"
import { AccountSnapshot, getTransferAccount, updateAccountBalance } from "@/remote/account"
import { createTransaction } from "@/remote/transaction"
import { Transaction, TransactionType } from "@/model/transaction"
import { collection, doc } from "firebase/firestore"
import { store } from "@/remote/firebase"
import { COLLECTION } from "@/constant/collection"

interface TransactionProps {
    type : "transfer" | "deposit-withdraw",
    accounts : AccountSnapshot[]
}

interface FormValueType {
    accountNumber : string
    type : '입금' | '출금' | '송금' | '수취'
    amount : string,
    displayText : string
}

export default function TransactionForm({
    type,
    accounts
} : TransactionProps) {

    const myAccount = accounts?.[0];

    const [formValue, setFormValue] = useState<FormValueType>({
        accountNumber : '',
        type : '입금',
        amount : '',
        displayText : '',
    })

    const handleFormValues = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValue((prevFormValues)=>({
            ...prevFormValues,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async () => {

        let TO, FROM;
        let fromAccountBalance, toAccountBalance;

        const toAccountNumber = type === 'deposit-withdraw' 
            ? myAccount?.accountNumber as string 
            : formValue.accountNumber;

        const fromAccountNumber = myAccount?.accountNumber as string

        const transactionType = type === 'deposit-withdraw'
            ? formValue.type
            : '송금'
    
        const fromAccount = myAccount;

        if ((transactionType === "출금" || transactionType === "송금")){
            if(fromAccount.balance - Number(formValue.amount) < 0){
                window.alert(`지금 사용자의 잔액은 ${fromAccount.balance}원 입니다. 다시 시도해주세요.`)

                return;
            }
            fromAccountBalance = fromAccount.balance - Number(formValue.amount);
        } else {
            fromAccountBalance = fromAccount.balance + Number(formValue.amount);
        }

        
        // if(
        //     (transactionType === "출금" || transactionType === "송금") &&
        //     fromAccount.balance - Number(formValue.amount) < 0
        // ) {
        //     window.alert(`지금 사용자의 잔액은 ${fromAccount.balance}원 입니다. 다시 시도해주세요.`)
        
        //     return;
        // }

        // const fromAccountBalance = 
        //    (transactionType === "출금" || transactionType === "송금")
        //     ?  fromAccount.balance - Number(formValue.amount)
        //     :  fromAccount.balance + Number(formValue.amount)

  
        if(type === 'transfer'){
            const toAccount = await getTransferAccount(toAccountNumber);

            if( toAccount == null ) {
                window.alert("해당 계좌가 존재하지 않습니다.")
                return;
            }

            // toAccountBalance = formValue.type === "송금" 
            //     ?  toAccount.balance + Number(formValue.amount)
            //     :  toAccount.balance - Number(formValue.amount)

            toAccountBalance = toAccount.balance + Number(formValue.amount);

            const toAccountTransaction = {
                ...formValue,
                user : doc(collection(store, COLLECTION.USER), toAccount.userId),
                transactionTarget : doc(collection(store, COLLECTION.USER), fromAccount.userId),
                type : '수취' as TransactionType,
                amount : Number(formValue.amount),
                date : new Date().toISOString(),
                balance : toAccountBalance, 
            }

            TO = {
                account : toAccount,
                transaction : toAccountTransaction
            }

            const fromAccountTransaction = {
                ...formValue,
                user : doc(collection(store, COLLECTION.USER), fromAccount.userId),
                transactionTarget : doc(collection(store, COLLECTION.USER), toAccount.userId),
                type : transactionType,
                amount : Number(formValue.amount),
                date : new Date().toISOString(),
                balance : fromAccountBalance,
            } as Transaction
    
            FROM = {
                account : fromAccount,
                transaction : fromAccountTransaction
            }

            // await Promise.all([
            //     createTransaction(toAccountTransaction), 
            //     createTransaction(fromAccountTransaction), 
            //     updateAccountBalance(toAccountNumber, toAccountBalance),
            //     updateAccountBalance(fromAccountNumber, fromAccountBalance)
            // ]);
            await createTransaction({to : TO, from : FROM});
      
        } else {
            // await Promise.all([
            //     createTransaction(fromAccountTransaction), 
            //     updateAccountBalance(fromAccountNumber, fromAccountBalance)
            // ]);
            
            const fromAccountTransaction = {
                ...formValue,
                user : doc(collection(store, COLLECTION.USER), fromAccount.userId),
                transactionTarget : doc(collection(store, COLLECTION.USER), fromAccount.userId),
                type : transactionType,
                amount : Number(formValue.amount),
                date : new Date().toISOString(),
                balance : fromAccountBalance,
            } as Transaction
    
            FROM = {
                account : fromAccount,
                transaction : fromAccountTransaction
            }

            await createTransaction({from : FROM});
        }

  
        window.alert("입출금이 완료되었습니다.");
    }

    return (
        <div>
            <Flex direction="column" style = {{padding : "32px", maxWidth : "420px"}}>
                {
                    type === "deposit-withdraw" 
                    ? null
                    : (
                        <TextField 
                            name = "accountNumber" 
                            label = "계좌 번호" 
                            value = {formValue.accountNumber} 
                            onChange={handleFormValues} 
                        />
                    )
                }
                <Spacing size = {20} />
                {
                    type === "transfer"
                    ? null
                    : (
                        <Select 
                            name = "type" 
                            value = {formValue.type}
                            options = {[
                                {
                                    label : "입금", value : "입금",
                                },
                                {
                                    label : "출금", value : "출금",
                                }
                            ]} 
                            onChange={handleFormValues}
                        />
                    )
                }
                <Spacing size = {8} />
                <TextField 
                    label = "입출금 금액" 
                    name = "amount" 
                    value = {formValue.amount} 
                    onChange={handleFormValues}    
                />
                <Spacing size = {8} />
                <TextField 
                    label = "메모" 
                    name = "displayText" 
                    value = {formValue.displayText}
                    onChange={handleFormValues}    
                />
                <Spacing size = {30} />
                <Button onClick={handleSubmit}>
                    {
                        type === "transfer" ? "송금" : (
                            type === "deposit-withdraw" && formValue.type === '입금' ? "입금" : "출금"
                        )
                    }
                </Button>
            </Flex>
        </div>
    )
}
