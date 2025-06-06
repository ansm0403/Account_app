export interface Term {
    id : string
    title : string
    link : string
    mandatory : boolean
}

export interface BaseForm {
    id : string
    label : string
    required : boolean
    helpMessage?: string
}

interface TextFieldForm extends BaseForm{
    type : "TEXT_FIELD"
}

interface SelectFieldForm extends BaseForm {
    type : "SELECT"
    options : Array<{ label : string; value : string }>
}

export type AccountForm = TextFieldForm | SelectFieldForm

type AccountStatus = 'READY' | "DONE"

export interface Account {
    accountName : string,
    accountNumber : string,
    cardNumber : string,
    balance : number,
    validThru : string,
    email : string,
    name : string,
    phone : string,
    status : AccountStatus,
    userId : string
}
