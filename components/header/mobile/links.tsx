'use client'
import { useContext } from 'react';
import { HeaderBarContext } from '@/_util/contextItems'; 
import { useRouter } from 'next/navigation'; 

type context = {
    closeMenu: ( c: HTMLDivElement) => void, 
}

const GoSignUpLink = (props: context): React.ReactElement => {
    const {
        closeMenu
    } = props; 
    const router = useRouter()
    const { MobileMenuRef } = useContext(HeaderBarContext)
    return (
        <div
            className="block md:inline-block"
            onClick={() => {
                router.push("/signup")
                closeMenu(MobileMenuRef.current)
            }}>Sign Up</div>
    )
}

const CloseMenuLink = (props: context): React.ReactElement => {
    const {
        closeMenu
    } = props; 
    const router = useRouter()
    const { MobileMenuRef } = useContext(HeaderBarContext)
    return (
        <div
            className="block md:inline-block"
            onClick={() => closeMenu(MobileMenuRef.current)}>Close</div>
    )
}

export {
    GoSignUpLink,
    CloseMenuLink, 
} 