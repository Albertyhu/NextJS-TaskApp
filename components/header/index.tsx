import { getServerSession } from 'next-auth/next'; 
import { authOptions } from '@/_util/authOptions';
import {
    LogoComponent,
} from './menuLinks';
import HeaderWrapper from './clientWrapper';

import MobileHeader from './mobile'; 
import {
    SessionInterface, 
} from '@/_util/interface'; 
import AccountComponent from "./accountComponent"; 

const Header = async () => {

    const session : SessionInterface | null = await getServerSession(authOptions as any)
    const HeaderBackgroundColor = "bg-black";
    const TextColor = "text-white";
    const HeaderStyle = `w-full fixed top-0 left-0 right-0 text-2xl z-30 ${HeaderBackgroundColor} ${TextColor}`;
    const LogoStyle = `h-auto cursor-pointer select-none inline-block max-w-[168px] ml-1`
    const DesktopStyle = `hidden md:block w-full min-h-[50px] relative`;


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
                    <AccountComponent />
                </div>
                <MobileHeader />
            </div>
        </HeaderWrapper>
    )
}

export default Header;  