'use client'
import React, { useContext } from 'react';
import {
    GlobalInterface,
} from '@/_util/interface';
import { AppContext } from '@/_util/contextItems';

import {
    AccountLink,
    HomeLink,
    GoAllUsersLink, 
    GoAboutPageLink,
    GoSignUpLink, 
} from './menuLinks';
import dynamic from 'next/dynamic';
const AccountMenu = dynamic(() => import('./AccountMenu'), {
    loading: ()=><div>Loading...</div>
})

const Component = () : React.ReactElement  => {

    const { session } = useContext(AppContext) as GlobalInterface;
    const DesktopMenuLinks = `left-auto right-[10px] top-0 bottom-0 absolute h-auto translate-y-[20%] inline-block
            [&>div]:mx-[10px] [&>div]:cursor-pointer active:[&>div]:translate-x-[5px] active:[&>div]:translate-y-[5px]`;

    return (
        <div
            id="DesktopMenuLinks"
            className={DesktopMenuLinks}
        >
            <GoAboutPageLink />
            {session ?
                <>
                    <AccountLink
                    label={session?.user?.name}
                    />
                    <AccountMenu />
                </>
                :
                <GoSignUpLink />
            }
        </div>
    )
}

export default Component;  