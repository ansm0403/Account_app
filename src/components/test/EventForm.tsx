'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import Flex from '../shared/Flex'
import Button from '../shared/Button'
import TextField from '../shared/TextField'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTION } from '@/constant/collection'
import Preview from '../event/Preview'

export default function EventForm() {

    const [formValue, setFormValue] = useState({
        title : '',
        subTitle : '',
        contents : '',
        buttonLabels : '',
        link : '',
        endDate : '',
    })

    const handleFormValues = useCallback((e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [e.target.name] : e.target.value
        }))
    },[])

    const handleSubmit = async () => {
        await setDoc(doc(collection(store, COLLECTION.EVENT)), formValue)
    
        alert("이벤트 정보를 추가했습니다.");
    }

    const enableSubmit = Object.values(formValue).every(
        (value) => value !== '', 
    )

  return (
    <Flex direction='column'>
        <Flex>
            <Flex style = {{flex : 1}} direction='column'>
                <TextField name='title' label='이벤트 제목' onChange={handleFormValues} value={formValue.title}/>
                <TextField name='subTitle' label='이벤트 부제목' onChange={handleFormValues} value={formValue.subTitle}/>
                <textarea style = {{height : 400}} name='contents' onChange={handleFormValues} value={formValue.contents}/>
                <TextField name='buttonLabel' label='버튼명' onChange={handleFormValues} value={formValue.buttonLabels}/>
                <TextField name='link' label='링크' onChange={handleFormValues} value={formValue.link}/>
                <TextField name= 'endDate' label='이벤트 종료' onChange={handleFormValues} value={formValue.endDate}/>
            </Flex>
            <Flex style = {{flex : 2}}>
                <Preview data = {formValue} />
            </Flex>
        </Flex>
        <Button onClick={handleSubmit} disabled = {enableSubmit === false}>저장하기</Button>
    </Flex>
  )
}
