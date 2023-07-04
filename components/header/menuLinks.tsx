'use client'
import {
    useCallback,
    useContext,
} from 'react'; 
import { useRouter } from 'next/navigation'; 
import PlaceHolder from '@/_assets/images/PlaceholderLogo.png';
import Logo from '@/_assets/images/TASK-APP.png';
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
                src={Logo}
                alt="Task App Logo"
            />
        </div>
    )
}

const HomeLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div className="block md:inline-block select-none" onClick={() => router.push("/")}>Home</div>
    )
} 

const GoAllUsersLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div className="block md:inline-block select-none" onClick={() => router.push("/users")}>View all users</div>
    )
} 

const GoSignInLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div
            className="block md:inline-block"
            onClick={() => router.push("/signin")}>Sign In</div>
    )
}

const GoSignUpLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div
            className="block md:inline-block"
            onClick={() => router.push("/signup")}>Sign Up</div>
    )
}


const GoAboutPageLink = (): React.ReactElement => {
    const router = useRouter()
    return (
        <div
            className="block md:inline-block"
            onClick={() => router.push("/about")}>About</div>
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
            onClick={()=>openMenu(MenuRef.current)}>{label ? label : "Account"}</div>
    )
}


export {
    LogoComponent,
    HomeLink, 
    GoSignInLink, 
    GoSignUpLink, 
    AccountLink, 
    GoAllUsersLink, 
    GoAboutPageLink,
}
