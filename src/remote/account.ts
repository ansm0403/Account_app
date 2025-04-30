import { COLLECTION } from "@/constant/collection";
import { collection, doc, getDoc, setDoc, updateDoc, where, query, onSnapshot } from "firebase/firestore";
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

export async function getAccount(
    userId : string,
) : Promise<AccountSnapshot[] | null>
{
    const accountQuery = query(
        collection(store, COLLECTION.ACCOUNT),
        where("userId", "==", userId)
    )
    
    // const snapshot = await getDocs(accountQuery);

    // if(snapshot.empty) return null
    // else{
    //     return snapshot.docs.map((doc)=>{
    //         return {
    //             id : doc.id,
    //             ...(doc.data() as Account),
    //         }
    //     })
    // }
    
    return new Promise<AccountSnapshot[] | null>((res)=>{
        onSnapshot(accountQuery, (snapshot) => {
            const account = snapshot.docs.map((doc)=>({
                    id : doc.id,
                    ...(doc.data() as Account)
                })
            )
            res(account);
        })
    }).then((data)=>{
        if((data as AccountSnapshot[]).length === 0) return null;
        else {
            return data;
        }
    })
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