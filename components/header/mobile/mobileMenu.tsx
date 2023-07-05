"use client"
import {  useContext, useRef, useEffect, useState } from 'react';
import {
    AppContext,
    HeaderBarContext, 
} from '@/_util/contextItems'; 
import {
    GlobalInterface,
    HeaderBarType,
} from '@/_util/interface';
import '../animation.css';
import dynamic from 'next/dynamic'; 
import LoadingComponent from "../../loadingComponent";
import {
    GoAllUsersLink,
    HomeLink, 
    GoAboutPageLink, 
} from '../menuLinks';
const MemberComponent = dynamic(()=>import("../memberComponent"), {
    loading: () => <LoadingComponent entirePage={false} />
})
const GuestComponent  = dynamic(()=>import("../guestComponent"), {
    loading: () => <LoadingComponent entirePage={false} />
}) 
const MobileMenu = (): React.ReactElement => {
    const {
        session,
        containerRef, 
    } = useContext(AppContext) as GlobalInterface; 

    const {
        MobileMenuRef,
        MobileIconRef, 
    } = useContext(HeaderBarContext) as HeaderBarType; 

    const checkIfClickedOutside = (evt : MouseEvent): void => {
        if (!MobileMenuRef?.current?.classList.contains("fadeOut")
            &&!MobileMenuRef?.current?.classList.contains("firstFrame")
            && evt.target != MobileMenuRef.current
            && evt.target != MobileIconRef.current
            && !MobileIconRef?.current?.contains(evt.target as Node)
            && !MobileMenuRef?.current?.contains(evt.target as Node)
        ) {
            MobileMenuRef?.current?.classList.remove("fadeIn")
            MobileMenuRef?.current?.classList.add("fadeOut");
        }
    }

    useEffect(() => {
        containerRef?.current?.addEventListener('mousedown', checkIfClickedOutside)
        return () => {
            containerRef?.current?.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [MobileMenuRef.current])

    const animationStyle = "transition-all duration-1000 animationMode"

    return (
        <div
            id="MobileMenu"
            className={`rounded-lg bg-slate-100 w-fit h-fit px-10 py-1 absolute left-auto right-[0px] top-[50px] cursor-pointer box_shadow [&>div]:text-slate-500 [&>div]:my-10 firstFrame ${animationStyle}`}
            ref={MobileMenuRef}
        >
            <GoAboutPageLink />
            {session ? 
                <MemberComponent element={MobileMenuRef?.current} />    
                :
                <GuestComponent />
            }
        </div>
    )
}

export default MobileMenu; 