'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Flex from './Flex';
import { colors } from '@/styles/colorPalette';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';
import Loading from './Loading';

function Navbar() {
    
    const {data : session } = useSession();
    const [ loading, setLoading ] = useState(false);
    const pathname = usePathname();
    const showSignInButton = ['/auth/signin'].includes(pathname) === false
    

    useEffect(()=>{
        return () => {
            setLoading(false); 
        }
    },[pathname])

    const renderButton = useCallback(()=>{
        if(session != null) {
            return (
                <Link href="/my" onClick={()=>{setLoading(true)}}>
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
                <Link href = "/auth/signin" onClick={()=>{setLoading(true)}}>
                    <Button>로그인/회원가입</Button>
                </Link>
            )
        }

        return null;

    }, [session, showSignInButton])

    return (
        <Flex justify='space-between' align='center' style={{position : "sticky",...navbarStyles}} >
            <div style = {homeNavbarStyles}>
                <Link 
                    href = "/" 
                    style = {{fontStyle : "italic"}}
                    onClick={() => {
                        if(pathname !== '/') setLoading(true)
                    }}
                >My Banking</Link>
            </div>
            {renderButton()}
            { loading && <Loading /> }
        </Flex>
    )
}

const homeNavbarStyles = {
    fontWeight : "bold",
    color : `${colors.blue980}`,
    fontSize : "1.2rem",
}

const navbarStyles = {
    padding : "10px 24px",
    top : "0",
    backgroundColor : colors.white,
    zIndex : "10",
    borderBottom : `1px solid ${colors.gray100}`
}

export default Navbar;