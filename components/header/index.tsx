import { getServerSession } from 'next-auth/next'; 
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from '@/_util/authOptions';
import { SignOutButton } from '@/components/button'; 
import {
    LogoComponent,
    HomeLink,
    GoSignInLink, 
    AccountLink, 
} from './menuLinks';
import HeaderWrapper from './clientWrapper';
import AccountMenu from './AccountMenu'; 
import MobileHeader from './mobile'; 
import {
    SessionInterface, 
} from '@/_util/interface'; 

const Header = async () => {

    const session : SessionInterface | null = await getServerSession(authOptions as any)
    const HeaderBackgroundColor = "bg-black";
    const TextColor = "text-white";
    const HeaderStyle = `w-full fixed top-0 left-0 right-0 text-2xl z-30 ${HeaderBackgroundColor} ${TextColor}`;
    const LogoStyle = `h-auto cursor-pointer select-none inline-block max-w-[168px] ml-1`
    const DesktopStyle = `hidden md:block w-full min-h-[50px] relative`;
    const DesktopMenuLinks = `left-auto right-[10px] top-0 bottom-0 absolute h-auto translate-y-[20%] inline-block
            [&>div]:mx-[10px] [&>div]:cursor-pointer active:[&>div]:translate-x-[5px] active:[&>div]:translate-y-[5px]`;

    return (
        <HeaderWrapper>
            <div
                id="HeaderWrapper"
                className={HeaderStyle}>
                <div
                    id="DesktopHeader"
                    className={DesktopStyle}
                >
                    <LogoComponent />
                    <div
                        id="DesktopMenuLinks"
                        className={DesktopMenuLinks}
                    >
                        <HomeLink />
                        {session ?
                            <>
                                <AccountLink 
                                    label = {session?.user?.name}
                                />
                                <AccountMenu />
                            </>
                            :
                            <GoSignInLink />
                        }
                    </div>
                </div>
                <MobileHeader />
            </div>
        </HeaderWrapper>
    )
}

export default Header;  