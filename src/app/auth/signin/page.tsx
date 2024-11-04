
import { getProviders } from 'next-auth/react'
import React from 'react'
import Signin from './signin';


export default async function SignInPage() {

    const providers = await getProviders();

    console.log("provider : ", providers);
    return (
        <div>
            <Signin providers = {providers}/>
        </div>
    )
}
