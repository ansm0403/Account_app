'use client'

import { ChangeEvent, useState } from "react"
import Flex from "../shared/Flex"
import TextField from "../shared/TextField"
import Select from "../shared/Select"
import Spacing from "../shared/Spacing"
import Button from "../shared/Button"
import { getAccount, updateAccountBalance } from "@/remote/account"
import { createTransaction } from "@/remote/transaction"
import { Transaction } from "@/model/transaction"

export default function TransactionForm() {

    const [formValue, setFormValue] = useState({
        userId : '',
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

        const account = await getAccount(formValue.userId);

        if( account == null ) {
            window.alert("해당 유저는 계좌를 보유하고 있지 않습니다.")
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

        console.log("newTransaction : ", newTransaction );
        
        await Promise.all([
            createTransaction(newTransaction), 
            updateAccountBalance(formValue.userId, balance)
        ]);
    
        window.alert("입출금 데이터 생성 완료");
    }

    return (
        <div>
            <Flex direction="column" style = {{padding : "32px", maxWidth : "420px"}}>
                <TextField 
                    name = "userId" 
                    label = "유저 아이디" 
                    value = {formValue.userId} 
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
                    label = "화면에 노출할 텍스트" 
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
