import { COLLECTION } from "@/constant/collection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { store } from "./firebase";
import { EventBanner } from "@/model/banner";

export async function getEventBanner({hasAccount} : {hasAccount : boolean}){
    const bannerQuery = query(
        collection(store, COLLECTION.EVENT_BANNER), 
        where('hasAccount', '==', hasAccount),
    )

    const snapshot = await getDocs(bannerQuery)

    return snapshot.docs.map((doc)=>({
        id : doc.id,
        ...(doc.data() as EventBanner),

    }))
}