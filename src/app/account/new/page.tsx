
import NewAccount from '@/components/account/newAccount';
import { User } from '@/model/user';
import { getAccount, getTerms } from '@/remote/account';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';


let initialStep = 0;

export default async function NewAccountPage() {

    
    const session = await getServerSession(authOptions);

    const userId = session ? (session.user as User).id : " ";

    const agreedTerms = await getTerms(userId);

    if(agreedTerms == null) initialStep = 0;

    const account = await getAccount(userId);

    if(account == null) initialStep = 1;
    else initialStep = 2;

    return (
       
        <div>
            <NewAccount initialStep={initialStep} />
        </div>
    )
}