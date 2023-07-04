'use client'
import { useRouter } from 'next/navigation'; 

type GoHomeType = {
    pathname: string, 
    query: {
        message: string | null, 
    }
}

const NavigationHooks = () => {
 
    const router = useRouter(); 
    function GoHome(message?: string) : void{
        router.push("/")
    }

    function GoSignIn() {
        router.push("/signin")
    }

    function GoSignUp() {
        router.push("/signup")
    }

    return {
        GoHome,
        GoSignIn,
        GoSignUp, 
    }
}

export { NavigationHooks }