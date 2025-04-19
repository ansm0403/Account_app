
import { getProviders } from 'next-auth/react'
import React from 'react'
import Signin from './signin';


export default async function SignInPage() {

    const providers = await getProviders();

    if(!providers) return null;

    return (
        <div>
            <Signin providers = {providers}/>
        </div>
    )
}
