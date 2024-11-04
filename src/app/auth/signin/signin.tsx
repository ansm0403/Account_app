'use client'

import React from 'react'
import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

type Props = {
    providers : Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export default function Signin({providers} : Props) { 
  return (
    <>
        <Spacing size={100} />
            <Flex direction='column' align='center'>
                <Text bold={true}>My Account</Text>
                <Spacing size = {80} />
                <ul>
                    {Object.values(providers).map((provider) => (
                        <li key = {provider.id}>
                            <Button onClick={()=> signIn(provider.id, {callbackUrl : '/'})}>
                                {provider.name} LOGIN
                            </Button>
                        </li>
                    ))}
                </ul>
            </Flex>
    </>
  )
}
