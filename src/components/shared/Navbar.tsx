'use client'

import React, { useCallback } from 'react'
import Flex from './Flex';
import { colors } from '@/styles/colorPalette';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from './Button';

function Navbar() {
    
    const {data : session } = useSession();
    const router = useRouter();
    const showSignInButton = ['/auth/signin'].includes(router.pathname) === false


    const renderButton = useCallback(()=>{
        if(session != null) {
            return (
                <Link href="/my">
                    <Image 
                        width = {40} 
                        height = {40} 
                        alt = "user-image" 
                        src = {session.user?.image ?? ''} 
                    />
                </Link>
            )
        }
        if(showSignInButton){
            return (
                <Link href = "/auth/signin">
                    <Button>로그인/회원가입</Button>
                </Link>
            )
        }

        return null;

    }, [session, showSignInButton])

    return (
        <Flex justify='space-between' align='center' style={{position : "sticky",...navbarStyles}}>
            <Link href = "/">My Account</Link>
            {renderButton()}
        </Flex>
    )
}

const navbarStyles = {
    padding : "10px 24px",
    top : "0",
    backgroundColor : colors.white,
    zIndex : "10",
    borderBottom : `1px solid ${colors.gray100}`
}

export default Navbar;