'use client'
import { Button } from "./ui/button"
import Panel from './panel';
import {
    GoogleRegistrationButton,
    GithubRegistrationButton,
    GoSignUp,
} from "./button";
import { signIn } from "next-auth/react"
export default function AuthPanel() {
    //return (
    //    <Panel>
    //        <h2
    //            className = "text-center text-2xl my-10"
    //        >Sign into your account</h2>
    //        <GoogleRegistrationButton customStyle={"my-5"} />
    //        <GithubRegistrationButton customStyle={"my-5"} />
    //    </Panel>
    //)
    return (
        <Panel>
            <h2
                className="text-center text-2xl my-10"
            >Sign into your account</h2>
            <button
                className="btn-primary"
                onClick={()=>signIn()}
            >
                Sign into an account
            </button>
            <hr className = "border-2 bg-slate-500 w-11/12 mx-auto my-10"/>
            <GoSignUp customStyle ="mx-auto" />
        </Panel>
    )
}