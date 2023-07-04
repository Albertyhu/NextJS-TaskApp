'use client'
import { useRef, useContext } from 'react'; 
import { AppContext } from '@/_util/contextItems';
import { GlobalInterface } from '@/_util/interface'; 
type context = {
    children: React.ReactNode, 
}

const Container = ({children} : context) => {
    const {
        containerRef,
    } = useContext(AppContext) as GlobalInterface;
    return (
        <div
            id="container"
            ref={containerRef}
        >
            {children}
        </div>
    )
}

export default Container; 