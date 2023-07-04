'use client'
import { useContext } from 'react';
import {
    GlobalInterface,
} from '@/_util/interface';
import { AppContext } from '@/_util/contextItems';
import {
    GoSignInLink,
    AccountLink,
} from './menuLinks';
import dynamic from 'next/dynamic';

const AccountMenu = dynamic(() => import('./AccountMenu'), {
    loading: ()=><div>Loading...</div>
})

const Header = async () => {

    const { session } = useContext(AppContext) as GlobalInterface;

    return session ?
                <>
                    <AccountLink
                        label={session?.user?.name}
                    />
                    <AccountMenu />
                </>
                :
                <GoSignInLink />
}

export default Header;  