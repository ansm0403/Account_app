import { COLLECTION } from "@/constant/collection";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { store } from "./firebase";
import { Account } from "@/model/account";

export interface AccountSnapshot extends Account{
    id : string
}

export function setTerms({
    userId, cardId, termIds, type
} : {
    userId? : string; cardId? : string, termIds : string[], type : string
}){
    if(type === "card"){
        return setDoc(doc(collection(store, COLLECTION.TERMS), cardId), {
            userId,
            cardId,
            termIds,
            type
           })
    }
    return setDoc(doc(collection(store, COLLECTION.TERMS), userId), {
        userId,
        termIds,
        type
    })
}

export function getAccount(){};

export async function getTerms(id : string){
    const snapshot = await getDoc(doc(collection(store, COLLECTION.TERMS), id))

    if (snapshot.exists() === false){
        return null;
    }
    
    return {
        id : snapshot.id,
        ...(snapshot.data() as {userId : string; termIds : string[]; type : string})
    }
}

export function createAccount(newAccount : Account){
    return setDoc(
                doc(
                    collection(store, COLLECTION.ACCOUNT), 
                    newAccount.accountNumber
                ), 
            newAccount,
        )
}


export async function getTransferAccount(accountNumber : string){

    const snapshot = await getDoc(doc(collection(store, COLLECTION.ACCOUNT), accountNumber))

    if (snapshot.exists() === false){
        return null;
    }

    return {
        id : snapshot.id,
        ...(snapshot.data() as Account)
    }
}

export function updateAccountBalance(accountNumber: string, balance : number){
    const snapshot = doc(collection(store, COLLECTION.ACCOUNT), accountNumber)

    return updateDoc(snapshot, { balance })
}