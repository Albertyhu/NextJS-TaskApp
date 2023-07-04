"use client" 
import {
    useCallback,
    useContext
} from 'react'; 
import { useRouter } from 'next/navigation'; 
import { useSession, signOut } from "next-auth/react"; 
import {
    HeaderBarContext,
    AppContext, 
} from '@/_util/contextItems'; 
import {
    GlobalInterface, 
    HeaderBarType, 
} from '@/_util/interface'
type context = {
    customStyle?: string, 
    element: HTMLDivElement | null, 
} 

const SignOutLink = (props : context): React.ReactElement => {
    const {
        customStyle = "", 
        element, 
    } = props; 
    const {
        closeMenu,
    } = useContext(HeaderBarContext) as HeaderBarType; 
    const {
        setList, 
    } = useContext(AppContext) as GlobalInterface; 
    const router = useRouter(); 
    return (
        <div
            onClick={() => {
                signOut();
                //clear task list
                setList([]); 
                router.push("/")
                closeMenu(element);
            }}
            className={`${customStyle != "" ? customStyle : "text-center mx-auto select-none"}`}
        >Sign Out</div>
    )
}


const CloseMenuLink = (props: context) : React.ReactElement => {
    const {
        customStyle = "",
        element, 
    } = props; 
    const {
        closeMenu,
    } = useContext(HeaderBarContext) as HeaderBarType; 
    return (
        <div
            onClick={useCallback(() => closeMenu(element), [])}
            className={`${customStyle != "" ? customStyle : "text-center mx-auto select-none"}`}
        >Close Menu</div>
    )
}

export {
    SignOutLink,
    CloseMenuLink, 
}