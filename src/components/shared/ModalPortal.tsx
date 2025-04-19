import { ReactNode } from 'react'
import ReactDOM from 'react-dom';

interface modalProps {
    children : ReactNode
}

export default function LoadingPortal({children} : modalProps) {   
    if(typeof window === 'undefined'){
        return null;
    }

    const node = document.getElementById('root-portal') as Element;

    return ReactDOM.createPortal(children, node);
}
