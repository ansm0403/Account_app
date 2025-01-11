import { PiggyBank } from "@/model/piggybank";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTION } from "@/constant/collection";

export function createPiggybank(newPiggyBank : PiggyBank){
    return setDoc(doc(collection(store, COLLECTION.PIGGYBANK)), newPiggyBank);
}

export async function getPiggybank(userId : string){
    const snapshot = await getDocs(query(
        collection(store, COLLECTION.PIGGYBANK),
        where('userId', '==', userId),
        where('endDate', '>=', new Date()),
        orderBy('endDate', 'asc'),
        limit(1),
    ))

    if(snapshot.docs.length === 0) {
        return null
    }

    const piggybank = snapshot.docs[0].data()

    return {
        id : snapshot.docs[0].id,
        ...(piggybank as PiggyBank),
        startDate : piggybank.startDate.toDate(),
        endDate : piggybank.endDate.toDate(),
    }
}