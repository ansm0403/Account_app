'use client'

import { ChangeEvent, useState } from "react"
import Flex from "../shared/Flex"
import TextField from "../shared/TextField"
import Select from "../shared/Select"
import Spacing from "../shared/Spacing"
import Button from "../shared/Button"
import { getTransferAccount, updateAccountBalance } from "@/remote/account"
import { createTransaction } from "@/remote/transaction"
import { Transaction } from "@/model/transaction"
import useUser from "@/hook/useUser"

export default function TransactionForm() {

    const user = useUser();

    const [formValue, setFormValue] = useState({
        userId : user?.id,
        accountNumber : '',
        type : 'deposit',
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

        const account = await getTransferAccount(formValue.accountNumber);

        if( account == null ) {
            window.alert("해당 계좌가 존재하지 않습니다.")
            return;
        }

        if(
            formValue.type === "withdraw" &&
            account.balance - Number(formValue.amount) < 0
        ) {
            window.alert(`지금 사용자의 잔액은 ${account.balance}원 입니다. 다시 시도해주세요.`)
        
            return;
        }

        const balance = 
            formValue.type === "withdraw" 
            ?  account.balance - Number(formValue.amount)
            :  account.balance + Number(formValue.amount)

        const newTransaction = {
            ...formValue,
            amount : Number(formValue.amount),
            date : new Date().toISOString(),
            balance,
        } as Transaction

        
        await Promise.all([
            createTransaction(newTransaction), 
            updateAccountBalance(formValue.accountNumber, balance)
        ]);
    
        window.alert("입출금이 완료되었습니다.");
    }

    return (
        <div>
            <Flex direction="column" style = {{padding : "32px", maxWidth : "420px"}}>
                <TextField 
                    name = "accountNumber" 
                    label = "계좌 번호" 
                    value = {formValue.accountNumber} 
                    onChange={handleFormValues} 
                />
                <Spacing size = {20} />
                <Select 
                    name = "type" 
                    value = {formValue.type}
                    options = {[
                        {
                            label : "입금", value : "deposit",
                        },
                        {
                            label : "출금", value : "withdraw",
                        }
                    ]} 
                    onChange={handleFormValues}
                />
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
                    {formValue.type === 'deposit' ? "입금" : "출금"}
                </Button>
            </Flex>
        </div>
    )
}
