
import { CARDFORMS, FORMS } from '@/constant/account'
import { AccountForm } from '@/model/account'
import { Fragment, useCallback } from 'react'
import {useForm} from 'react-hook-form'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'
import Select from '../shared/Select'
import dynamic from 'next/dynamic'

type FormData = {
    [key : string] : string
}

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
    ssr : false,
})

interface Props {
    onNext : (formValues : FormData) => void
    type? : string
}

export default function Form({onNext, type} : Props) {

    const { register, formState, handleSubmit } = useForm<FormData>({
        mode : 'onBlur'
    })

    const component = useCallback((form : AccountForm) => {
        if (form.type === 'TEXT_FIELD') {
            return <TextField 
                        label = {form.label} 
                        helpMessage = {
                            (formState.errors[form.id]?.message as string) || form.helpMessage
                         }
                        hasError = {formState.errors[form.id] != null}
                        {...register(form.id, {
                            required : form.required,
                            pattern : VALIDATION_MESSAGE_MAP[form.id],
                        })}
                    />
        } else if ( form.type === "SELECT") {
            return <Select label={form.label} options={form.options} {...register(form.id, {
                required : form.required,
                pattern : VALIDATION_MESSAGE_MAP[form.id],
            })}/>
        } else {
            return null;
        }
    }, [formState.errors, register])

    return (
        <div style = {{padding : "24px"}}>
            <form>
                {
                    type === 'card' 
                    ? (
                        CARDFORMS.map((form)=>{
                            return (
                                <Fragment key ={form.id}>
                                    {component(form)}
                                    <Spacing size = {8} />
                                </ Fragment>
                            )
                        })
                    ) 
                    : (
                        FORMS.map((form)=>{
                            return (
                                <Fragment key ={form.id}>
                                    {component(form)}
                                    <Spacing size = {8} />
                                </ Fragment>
                            )
                        })
                    )
                }
            </form>
            <FixedBottomButton label = "개설하기" onClick = {handleSubmit(onNext)} />
        </div>
    )
}

const VALIDATION_MESSAGE_MAP: {
    [key: string]: {
      value: RegExp
      message: string
    }
  } = {
    name: {
      value: /^[가-힣]+$/,
      message: '한글명을 확인해주세요',
    },
    email: {
      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: '이메일 형식을 확인해주세요',
    },
    phone: {
      value: /^\d+$/,
      message: '휴대전화번호를 확인해주세요',
    },
  }