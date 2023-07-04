'use client'
import {
    useCallback,
    useContext,
} from 'react'; 
import { useRouter } from 'next/navigation'; 
import PlaceHolder from '@/_assets/images/PlaceholderLogo.png';
import Image from 'next/image';
import {
    HeaderBarContext,
} from '@/_util/contextItems';
import {
    HeaderBarType, 
} from '@/_util/interface'

const LogoComponent = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div
            onClick={()=>router.push("/")}
            className={`h-auto cursor-pointer select-none inline-block max-w-[168px] ml-1`}
        >
            <Image
                src={PlaceHolder}
                alt="Placeholder Image"
            />
        </div>
    )
}

const HomeLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div className="inline-block select-none" onClick={() => router.push("/")}>Home</div>
    )
} 

const GoSignInLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div
            className="inline-block"
            onClick={() => router.push("/signin")}>Sign In</div>
    )
}


type AccountLinkType = {
    label: string, 
}

const AccountLink = (props: AccountLinkType): React.ReactElement => {
    const {
        label, 
    } = props; 

    const {
        openMenu,
        AccountLinkRef,
        MenuRef,
    } = useContext(HeaderBarContext) as HeaderBarType; 
    return (
        <div
            ref={AccountLinkRef}
            className="inline-block select-none"
            onClick={()=>openMenu(MenuRef.current)}>{label}</div>
    )
}


export {
    LogoComponent,
    HomeLink, 
    GoSignInLink, 
    AccountLink, 
}
