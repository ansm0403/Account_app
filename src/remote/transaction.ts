import { Transaction, TransactionFilterType } from "@/model/transaction";
import { store } from "./firebase";
import { collection, doc, DocumentData, DocumentReference, getDocs, limit, orderBy, query, QuerySnapshot, runTransaction, startAfter, where } from "firebase/firestore";
import { COLLECTION } from "@/constant/collection"
import { AccountSnapshot } from "./account";

interface CreateProps {
    [ key : string ] : TransactionMeta
}

interface TransactionMeta {
    account : AccountSnapshot,
    transaction : Transaction
}

export async function createTransaction({
    to, from
} : CreateProps
){
    try {
        const fromUserRef = doc(collection(store, COLLECTION.USER), from.account.userId);
        const fromAccountRef = doc(collection(store, COLLECTION.ACCOUNT), from.account.accountNumber)
        // Transaction 컬렉션에 들어갈 문서 Ref
        const fromTransRef = doc(collection(store, COLLECTION.TRANSACTION));
        // User 컬렉션에 중첩된 하위 Transaction 컬렉션의 Ref 
        const fromNestedTransRef = doc(collection(fromUserRef, COLLECTION.TRANSACTION)
    );
        let toUserRef : DocumentReference<DocumentData, DocumentData>;
        let toAccountRef : DocumentReference<DocumentData, DocumentData>;
        let toTransRef : DocumentReference<DocumentData, DocumentData>;
        let toNestedTransRef : DocumentReference<DocumentData, DocumentData>;

        if(from.transaction.type === '송금' || from.transaction.type === '수취') {
            toUserRef = doc(collection(store, COLLECTION.USER), to.account.userId);
            toAccountRef = doc(collection(store, COLLECTION.ACCOUNT), to.account.accountNumber)
            toTransRef = doc(collection(store, COLLECTION.TRANSACTION));
            toNestedTransRef = doc(collection(toUserRef, COLLECTION.TRANSACTION));
        } 

        await runTransaction(store, async (transaction)=>{      
            if (from.transaction.type === '송금' || from.transaction.type === '수취') {
                transaction
                .set(fromTransRef, from.transaction)
                .set(toTransRef, to.transaction)
                .set(fromNestedTransRef, {...from.transaction})
                .update(fromAccountRef, { balance : from.transaction.balance })
                .set(toNestedTransRef, {...to.transaction})
                .update(toAccountRef, { balance : to.transaction.balance })
            } else {
                transaction
                .set(fromTransRef, from.transaction)
                .update(fromAccountRef, { balance : from.transaction.balance })
                .set(fromNestedTransRef, {...from.transaction})
            }
        })
    } catch (e) {
        console.error(e);
    }
}

export async function getTransactions({ 
    pageParam, 
    userId,
    filter = 'all'
} : { 
    pageParam? : QuerySnapshot<Transaction>, 
    userId : string,
    filter? : TransactionFilterType
}){
    const transactionQuery = generateQuery({ filter, pageParam, userId })

    console.log("쿼리 : ", transactionQuery);

    const transactionSnapshot = await getDocs(transactionQuery);

    console.log("스냅샷 : ", transactionSnapshot);
    
    const lastVisible = transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

    const items = transactionSnapshot.docs.map((doc)=>({
        id : doc.id,
        ...(doc.data() as Transaction),
    }))

    return {
        items,
        lastVisible,
    }
}

export function generateQuery({
    filter, pageParam, userId
} : {
    pageParam? : QuerySnapshot<Transaction>, 
    userId : string,
    filter? : TransactionFilterType
}){


    const userRef = doc(collection(store, COLLECTION.USER), userId)

    const baseQuery = query(
        collection(userRef, COLLECTION.TRANSACTION), 
        orderBy('date', 'desc'),
        limit(10),
    )

    if (filter !== 'all') {
        if(pageParam == null) {
            return query(baseQuery, where('type', '==', filter))
        }
        return query(baseQuery, startAfter(pageParam), where('type', '==', filter));
    } else {
        if(pageParam == null) {
            return baseQuery;
        }
        return query(baseQuery, startAfter(pageParam));
    }
}