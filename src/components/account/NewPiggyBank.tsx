'use client'

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import Flex from '../shared/Flex';
import TextField from '../shared/TextField';
import dynamic from 'next/dynamic';
import withAuth from '../../hook/withAuth'
import {format} from 'date-fns'
import {PiggyBank} from '../../model/piggybank'
import useUser from '../../hook/useUser'
import { createPiggybank } from '../../remote/piggybank'
import { useMutation } from '@tanstack/react-query'
import { useAlertContext } from '../../context/AlertContext'

const FixedBottomButton = dynamic(() => import('../shared/FixedBottomButton'), {
  ssr : false
}) 


function NewPiggyBank() {
  const { open } = useAlertContext();

  const [ formValues, setFormValues ] = useState({
    name : '',
    endDate : '',
    goalAmount : '',
  })

  const user = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn : (newPiggybank : PiggyBank)=> createPiggybank(newPiggybank),
    onSuccess : () => {
      open({
        title : '새로운 저금통을 만들었어요.',
        onButtonClick : () => {
          window.history.back();
        }
      })
    },
    onError : () => {
      open({
        title : '저금통을 만들지 못했어요.',
        description : "잠시 후 다시 시도해주세요.",
        onButtonClick : () => {
          window.history.back();
        }
      })
    }
  })

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  const handleFormValues = useCallback((e : ChangeEvent<HTMLInputElement>)=>{
    setFormValues((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  },[])

  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount : Number(formValues.goalAmount),
      userId : user?.id as string,
      startDate : new Date(),
      endDate : new Date(formValues.endDate),
      balance : 0,
    } as PiggyBank 

    mutate(newPiggybank);
  } 

  return (
    <div>
      <Flex direction='column'>
        <TextField name = "name" label = "통장이름" value = {formValues.name} onChange={handleFormValues}/>
        <TextField name = "endDate" type = "date" min={minDate} label = "종료일자" value = {formValues.endDate} onChange={handleFormValues}/>
        <TextField name = "goalAmount" type = "number" label = "목표금액" value = {formValues.goalAmount} onChange={handleFormValues}/>
      </Flex>
      <FixedBottomButton 
        disabled = {isPending === true}
        label = {"저금통 생성하기"}
        onClick={()=>{
          handleSubmit();
        }}
      />
    </div>
    
  )
}

export default withAuth(NewPiggyBank)