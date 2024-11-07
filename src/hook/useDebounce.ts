import { useEffect, useState } from "react";

export default function useDebounce<T = any>(value : T, delay = 800){
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebounced(value)
        }, delay)

        return () => {
            clearTimeout(timeout);
        }
    },[delay, value])

    return debounced;
}