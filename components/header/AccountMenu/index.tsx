'use client'
import { useContext, useRef, useEffect, useState, lazy, Suspense } from 'react'; 
import {
    AppContext,
    HeaderBarContext,
} from '@/_util/contextItems'; 
import {
    HeaderBarType,
    GlobalInterface, 
} from '@/_util/interface';
import LoadingComponent from '../../loadingComponent';
import '../animation.css'
const MemberComponent = lazy(()=>import("../memberComponent"))

const AccountMenu = (): React.ReactElement => {
    const {
        containerRef,
    } = useContext(AppContext) as GlobalInterface; 

    const {
        MenuRef,
        AccountLinkRef,
    } = useContext(HeaderBarContext) as HeaderBarType; 

    const checkIfClickedOutside = (evt: Event): void => {
        if (!MenuRef.current?.classList.contains("fadeOut")
            && evt.target != MenuRef.current
            && evt.target != AccountLinkRef.current
            && !AccountLinkRef.current?.contains(evt.target as Node)
            && !MenuRef.current?.contains(evt.target as Node)
        ) {
            MenuRef.current?.classList.remove("fadeIn")
            MenuRef.current?.classList.add("fadeOut");
        }
    }

    useEffect(() => {
        containerRef.current?.addEventListener('mousedown', (evt: Event) =>checkIfClickedOutside(evt))
        return () => {
            containerRef.current?.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [MenuRef.current])

    const animationStyle = "fadeOut transition-all duration-1000 animationMode"


    return (
        <div
            id="AccountMenu"
            ref={MenuRef}
            className={`rounded-lg bg-slate-100 w-fit h-fit px-10 py-1 absolute left-auto right-[0px] top-[50px] cursor-pointer box_shadow [&>div]:text-slate-500 [&>div]:my-10 ${animationStyle}`}
        >
            <Suspense fallback={<h2>Loading...</h2>}>
                <MemberComponent
                    element={MenuRef.current}
                />
            </Suspense>
        </div>
    )
}

export default AccountMenu; 