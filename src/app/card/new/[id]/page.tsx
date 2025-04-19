
import { getTerms } from '@/remote/account';
import NewCard from './NewCard';
import { getUserCard } from '@/remote/userCard';


let initialStep = 0;

export default async function NewCardPage({params : { id }} : {params : {id : string}}) {

    console.log("id : ", id);

    const agreedTerms = await getTerms(id);

    if(agreedTerms == null) {
        initialStep = 0;
        return (
            <div>
                <NewCard cardId = {id} initialStep={initialStep} />
            </div>
        )
    }
    const account = await getUserCard(id);

    if(account == null) initialStep = 1;
    else initialStep = 2;

    return (
        <div>
            <NewCard cardId = {id} initialStep={initialStep} />
        </div>
    )
}
