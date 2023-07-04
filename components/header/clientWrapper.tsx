'use client'
import {
    useRef,
} from 'react';
import {
    HeaderBarContext,
} from '@/_util/contextItems'; 
import {
    GlobalInterface,
    HeaderBarType, 
} from '@/_util/interface';
type wrapperType = {
    children: React.ReactNode, 
}

const Wrapper = ({ children }: wrapperType) => {
    //const MenuRef = useRef<React.RefObject<HTMLDivElement>>(null);
    //const MobileMenuRef = useRef<React.RefObject<HTMLDivElement>>(null)
    //const MobileIconRef = useRef<React.RefObject<HTMLDivElement>>(null)
    //const AccountLinkRef = useRef<React.RefObject<HTMLDivElement>>(null);

    const MenuRef = useRef<HTMLDivElement>(null);
    const MobileMenuRef = useRef<HTMLDivElement>(null)
    const MobileIconRef = useRef<HTMLImageElement>(null)
    const AccountLinkRef = useRef<HTMLDivElement>(null); 


    const openMenu = (element: HTMLDivElement | null): void => {
        if (!element?.classList.contains("fadeIn"))
            element?.classList.remove("fadeOut")
        element?.classList.add("fadeIn")
    }

    const closeMenu = (element: HTMLDivElement | null): void => {
        if (!element?.classList.contains("fadeOut"))
            element?.classList.remove("fadeIn")
        element?.classList.add("fadeOut")
    }

    const context = {
        MenuRef, 
        openMenu, 
        closeMenu, 
        AccountLinkRef, 
        MobileMenuRef, 
        MobileIconRef 
    }

    return (
        <HeaderBarContext.Provider
            value={context}
        >{children}</HeaderBarContext.Provider>
    )
}

export default Wrapper; 