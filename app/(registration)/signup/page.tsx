import dynamic from 'next/dynamic';
import { GoogleRegistrationButton } from "@/components/button";
import { GoSignIn } from '@/components/button'; 
import LoadingComponent from '@/components/loadingComponent'; 
const SignUpForm = dynamic(() => import('./form'), {
    loading: () => <LoadingComponent entirePage={true}  />
}); 

const Panel = dynamic(() => import("@/components/panel"));

type RenderSignUpProps = {

}

const RenderSignUp = (props: RenderSignUpProps): React.ReactElement => {

    const ButtonStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px]
    active:translate-y-[5px] cursor-pointer border-white border-2 
    text-center w-[150px] select-none text-black mx-auto 
    hover:bg-[#d48518] bg-[#e48f1a] text-base block`

    return (
        <Panel>
            <SignUpForm />
            <hr className="my-[25px] h-[2px] border-[2px] border-black" />
            <h2 className="my-10 text-center text-lg">Already have an account with us?</h2>
            <GoSignIn
                customStyle={ButtonStyle}
            />
        </Panel>
    )
}

export default RenderSignUp; 