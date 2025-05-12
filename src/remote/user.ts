import { collection, doc, setDoc } from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTION } from "@/constant/collection";
import { OAuthUser } from "@/model/user";

export async function addUser({id, username, email, name, image} : OAuthUser){
    return setDoc(doc(collection(store, COLLECTION.USER), id), {
        id,
        username,
        email,
        name,
        image,
    })
}