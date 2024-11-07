import { COLLECTION } from "@/constant/collection"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { store } from "./firebase"
import { Credit } from "@/model/credit"

interface Props {
    userId : string
    creditScore : number
}

export function updateCredit({userId, creditScore } : Props){
    return setDoc(doc(collection(store, COLLECTION.CREDIT), userId), {
        userId, creditScore
    })
}

export async function getCredit(userId: string){
    const snapshot = await getDoc(doc(collection(store, COLLECTION.CREDIT), userId));

    if(snapshot.exists() === false){
        return null;
    }

    return {
        id : snapshot.id,
        ...(snapshot.data() as Credit)
    }
}