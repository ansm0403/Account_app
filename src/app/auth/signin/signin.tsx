'use client'

import React from 'react'
import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { colors } from '@/styles/colorPalette';

type Props = {
    providers : Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export default function Signin({providers} : Props) { 
  
    const handleSignin = (provider : ClientSafeProvider) => {
         
        signIn(provider.id, {callbackUrl : '/'})
    }

    return (
    <>
        <Spacing size={100} />
            <Flex direction='column' align='center'>
            <Text style = {titleStyle} bold={true}>MyAccounts</Text>
                <Spacing size = {30} />
                <Text typography='t3' bold>SNS 계정으로 로그인해주세요</Text>
                <Spacing size = {10} />
                <Text typography='t6'>계정이 없다면 자동으로 회원가입됩니다.</Text>
                <Spacing size = {60} />
                <ul>
                    {Object.values(providers).map((provider) => (
                        <li key = {provider.id}>
                            <Button style = {buttonStyle} onClick={()=> handleSignin(provider)}>
                                {provider.name} LOGIN
                            </Button>
                        </li>
                    ))}
                </ul>
            </Flex>
    </>
  )
}

const titleStyle = {
    "fontStyle" : "italic",
    "color" : `${colors.blue980}`,
    "fontSize" : "1.5rem",
}

const buttonStyle = {
    "fontSize" : "1.2rem",
    "width" : "20rem",
    "height" : "3rem",
}