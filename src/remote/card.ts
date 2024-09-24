import { COLLECTION } from "@/constant/collection";
import { collection, getDocs, limit, query, QuerySnapshot, startAfter } from "firebase/firestore";
import { store } from "./firebase";
import { Card } from "@/model/card";

export async function getCards(pageParam? : QuerySnapshot<Card>){
    const cardQuery = pageParam == null 
    ? query(collection(store, COLLECTION.CARD), limit(15))
    : query(collection(store, COLLECTION.CARD), startAfter(pageParam), limit(15))

    const cardSnapshot = await getDocs(cardQuery)
    const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

    const items = cardSnapshot.docs.map((doc) => ({
        id : doc.id,
        ...(doc.data() as Card),
    }))

    return {items, lastVisible}
}