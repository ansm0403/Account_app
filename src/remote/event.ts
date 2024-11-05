import { COLLECTION } from "@/constant/collection";
import { collection, doc, getDoc } from "firebase/firestore";
import { store } from "./firebase";
import { Event } from "@/model/Event";

export async function getEvent(id : string){
    const snapshot = await getDoc(doc(collection(store, COLLECTION.EVENT), id))

    return {
        id : snapshot.id,
        ...(snapshot.data() as Event)
    }
}