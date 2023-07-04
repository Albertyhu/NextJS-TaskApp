'use client'
import {
    useState,
    useContext,
    useCallback, 
} from 'react'; 

import dynamic from 'next/dynamic'; 
import LoadingComponent from '@/components/loadingComponent';
import { GoSignUp } from '@/components/button'; 
import { GoogleRegistrationButton } from "@/components/button"; 
const RenderForm = dynamic(() => import('./form'), {
    loading: () => <LoadingComponent entirePage={true} />
}); 

const Panel = dynamic(() => import("@/components/panel"), {
    loading: () => <LoadingComponent entirePage={true} />
}); 

type RenderSignInProps = {

}

const RenderSignIn = (props: RenderSignInProps): React.ReactElement => {
    const ButtonStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px]
    active:translate-y-[5px] cursor-pointer border-white border-2 
    text-center w-[150px] select-none text-black mx-auto 
    hover:bg-[#d48518] bg-[#e48f1a] text-base block`

    return (
        <Panel>
            <RenderForm />
            <hr className="my-[25px] h-[2px] border-[2px] border-black" />
            <h2 className="my-10 text-center text-lg">Don't have an account with us?</h2>
            <GoSignUp customStyle={ButtonStyle } />
        </Panel>
    )
}

export default RenderSignIn; 