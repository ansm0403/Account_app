import { COLLECTION } from "@/constant/collection";
import { collection, doc, getDoc, getDocs, limit, query,  QuerySnapshot, startAfter, where } from "firebase/firestore";
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


export async function getSearchCard(keyword : string){
    const searchQuery = query(
        collection(store, COLLECTION.CARD),
        where("name", ">=", keyword),
        where("name", "<=", keyword + '\uf8ff'),
    )
    console.log("서치 시작")
    const cardSnapshot = await getDocs(searchQuery);

    return cardSnapshot.docs.map((doc) => ({
        id : doc.id,
        ...(doc.data() as Card), 
    }))
}

export async function getCard(id : string){
    const cardSnapshot = await getDoc(doc(collection(store, COLLECTION.CARD), id))

    return {
        id : cardSnapshot.id,
        ...(cardSnapshot.data() as Card)
    }
}