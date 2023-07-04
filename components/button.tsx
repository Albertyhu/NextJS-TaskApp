'use client'
import {
    ReactElement,
    useCallback,
} from 'react'; 
import { useRouter } from 'next/navigation'; 
import { useSession, signIn, signOut } from "next-auth/react"
import {
    AiOutlineGoogle,
    AiFillGithub,
} from 'react-icons/ai';
import { IconContext } from 'react-icons'
const GoCounter = (): ReactElement => {
    const router = useRouter(); 
    
    return (
        <button
            id="NavigationButton"
            className="btn-primary"
            onClick={()=>router.push("/counter/nest/next")}
        >
            Counter
        </button>
       
    )  
}      

const GoSignIn = (props : ButtonType) : ReactElement => {
    const {
        customStyle, 
    } = props; 
    const router = useRouter();

    return (
        <button
            type='button'
            id="NavigationButton"
            className={`btn-primary ${customStyle}`}
            onClick={useCallback(() => router.push("/signin"), [])}
        >
            Sign In
        </button>

    )
}


const GoSignUp = (props: ButtonType): ReactElement => {
    const {
        customStyle,
    } = props;
    const router = useRouter();

    return (
        <button
            type='button'
            id="NavigationButton"
            className={`btn-primary ${customStyle}`}
            onClick={useCallback(() => router.push("/signup"), [])}
        >
            Sign Up
        </button>

    )
}

const SignOutButton = (props: ButtonType): ReactElement => {
    const { customStyle, } = props; 
    const router = useRouter(); 
    return (
        <button
            id="NavigationButton"
            className={`btn-primary ${customStyle}`}
            onClick={() => {
                signOut()
                router.push("/")
            }}
        >
            Sign Out
        </button>
    )
}

const GoogleRegistrationButton = (props: ButtonType): React.ReactElement => {
    const {
        customStyle,
        label = "Sign In with Google",
    } = props; 
    const context = {
        color: "yellow",
        size: "2em", 
    } 
    return (
        <button
            type="button"
            id="NavigationButton"
            className={`btn-primary [&>*]:mx-1 ${customStyle}`}
            onClick={() => {
                signIn("google");
            }}
        >
            <IconContext.Provider value={context}>
                <AiOutlineGoogle />
                {label}
            </IconContext.Provider>
        </button>
    )
}

const GithubRegistrationButton = (props: ButtonType): React.ReactElement => {
    const {
        customStyle,
        label = "Sign In with Github",
    } = props;
    const context = {
        color: "black",
        size: "2em",
    }
    return (
        <button
            type="button"
            id="NavigationButton"
            className={`btn-primary [&>*]:mx-1 ${customStyle}`}
            onClick={() => {
                signIn("github");
            }}
        >
            <IconContext.Provider value={context}>
                <AiFillGithub />
                {label}
            </IconContext.Provider>
        </button>
    )
}

const BackButton = (props: {customStyle?: string}) => {
    const {
        customStyle,
    } = props;
    const router = useRouter(); 
    return (
        <button className={`btn-secondary ${customStyle}`}
            onClick={()=>router.back()}
        >Go Back</button>
)
}

type ButtonType= {
    customStyle?: string,
    label?: string, 
} 

export {
    GoCounter, 
    GoSignIn, 
    SignOutButton, 
    GoogleRegistrationButton, 
    GoSignUp,
    GithubRegistrationButton, 
    BackButton,
};     