'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

interface contextProps {
    loading : boolean | undefined,
    setLoading : Dispatch<SetStateAction<boolean | undefined>>
}

const defaultValue = {
    loading : false,
    setLoading : () => {}
}

const loadingContext = createContext<contextProps>(defaultValue);

export default function LoadingContext({children} : { children : React.ReactNode}) {
    const [loading, setLoading] = useState<boolean>();
    
    useEffect(()=>{
        setLoading(false);
    },[])

    return (
        <loadingContext.Provider value = {{loading, setLoading}}>
            {children}
        </loadingContext.Provider>
    )
}

export function useLoadingContext(){
    const loading = useContext(loadingContext);

    if (loading == null) {
        throw new Error('LoadingContext 내부에서 사용해주세요')
      }

    return loading;
}