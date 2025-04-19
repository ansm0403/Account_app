import { COLLECTION } from "@/constant/collection";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { store } from "./firebase";
import { Account } from "@/model/account";


export function setTerms({
    userId, cardId, termIds, type
} : {
    userId? : string; cardId? : string, termIds : string[], type : string
}){
    if(type === "card"){
        console.log("CARD Terms 등록 함 ㅋㅋ")
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
                    newAccount.userId
                ), 
            newAccount,
        )
}

export async function getAccount(userId : string){
    const snapshot = await getDoc(doc(collection(store, COLLECTION.ACCOUNT), userId))

    if (snapshot.exists() === false){
        return null;
    }

    return {
        id : snapshot.id,
        ...(snapshot.data() as Account)
    }
}

export function updateAccountBalance(userId: string, balance : number){
    const snapshot = doc(collection(store, COLLECTION.ACCOUNT), userId)

    return updateDoc(snapshot, { balance })
}