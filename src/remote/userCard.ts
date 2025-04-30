import { COLLECTION } from "@/constant/collection"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { store } from "./firebase"
import { UserCard } from "@/model/card"

export function createUserCard(
    newCard : UserCard
){
    return setDoc(doc(collection(store, COLLECTION.USERCARD), newCard.cardNumber),
        newCard
    )
}

export async function getUserCard(
    cardId : string
){
    const snapshot = await getDoc(doc(collection(store, COLLECTION.USERCARD), cardId));

    return {
        id : snapshot.id,
        ...(snapshot.data() as UserCard)
    }
}