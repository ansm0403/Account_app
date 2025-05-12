import { DocumentData, DocumentReference } from "firebase/firestore"

export interface User {
    id : string
    name : string
    image? : string | null
    transactions? : DocumentReference<DocumentData, DocumentData>[]
}

export interface OAuthUser extends User{
    username? : string
    email : string
}

export interface UserSnapshot extends OAuthUser {
    transactions : DocumentReference<DocumentData, DocumentData>[]
}