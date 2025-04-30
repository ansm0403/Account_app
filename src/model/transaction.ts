export type TransactionType = 'deposit' | 'withdraw'

export type TransactionFilterType = 'all' | TransactionType

export interface Transaction {
    userId : string
    accountNumber : string
    type : TransactionType
    amount : number
    balance : number
    displayText : string
    date : string
}