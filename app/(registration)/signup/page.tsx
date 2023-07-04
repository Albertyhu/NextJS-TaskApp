import dynamic from 'next/dynamic';
import {
    GoSignIn, 
    BackButton, 
} from '@/components/button'; 
import LoadingComponent from '@/components/loadingComponent'; 
const SignUpForm = dynamic(() => import('./form'), {
    loading: () => <LoadingComponent entirePage={true}  />
}); 
import {
    GoogleRegistrationButton,
    GithubRegistrationButton,
} from "@/components/button";

const Panel = dynamic(() => import("@/components/panel"));

const RenderSignUp = (): React.ReactElement => {

    const ButtonStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px]
    active:translate-y-[5px] cursor-pointer border-white border-2 
    text-center w-[150px] select-none text-black mx-auto 
    hover:bg-[#d48518] bg-[#e48f1a] text-base block`

    return (
        <Panel>
            <SignUpForm />
            <hr className="bg-slate-500 mx-auto w-11/12 border-2" />
            <h2
                className ="my-10 text-center"
            >Or sign up with various platforms</h2>
            <div
                className = "mb-10"
            >
                <GoogleRegistrationButton customStyle={"my-5"} />
                <GithubRegistrationButton customStyle={"my-5"} />
            </div>
            <BackButton />

        </Panel>
    )
}

export default RenderSignUp; 