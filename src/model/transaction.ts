import { DocumentData, DocumentReference } from "firebase/firestore"

export type TransactionType = '입금' | '출금' | '송금' | '수취'

export type TransactionFilterType = 'all' | TransactionType

export interface Transaction {
    user : DocumentReference<DocumentData, DocumentData>
    transactionTarget : DocumentReference<DocumentData, DocumentData>,
    type : TransactionType 
    amount : number
    balance : number
    displayText : string
    date : string
    accountNumber? : string
}
