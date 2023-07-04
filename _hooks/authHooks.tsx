import Users from "@/model/user"; 
import axios from 'axios'; 
import db from '@/lib/mongooseConnect'
import { checkEmail } from '@/_hooks/checkEmail'; 
import { NavigationHooks } from '@/_hooks/navigation'; 
import { signIn } from 'next-auth/react'; 
import {
    CreateNewAccountInt,
} from "@/_util/interface"; 

type messageType = {
    param?: string, 
    msg: string, 
}

type PropTypes = {
    evt?: React.FormEvent<HTMLFormElement>, 
    username?: string,
    password: string,
    email?: string,
    confirmPass?: string,
    setMessage: (c: Array<messageType>) => void, 
    setLoading: (c: boolean) =>void, 
} 


const SubmitHooks = ({
    username,
    email,
    password,
    confirmPass,
    setMessage,
    setLoading, 
}: PropTypes) => {

    const { GoHome } = NavigationHooks(); 

    const SubmitRegistration = (evt: React.FormEvent) => {
    evt?.preventDefault(); 
    let isValid = true; 
    let errMessage = "Please, correct the following errors: \n"
    if (username == null || username === "") {
        //setMessage(prev => [...prev, { param: "username", msg: "Your username cannot be empty." }])
        errMessage += "Your username cannot be empty. \n"; 
        isValid = false; 
    }
    if (!checkEmail(email)) {
       // setMessage(prev => [...prev, { param: "email", msg: "The format of your email must be name@email.com" }])
        errMessage += "The format of your email must be name@email.com. \n"; 
        isValid = false; 
    }
    if (password == null || password.length < 4) {
        //setMessage(prev => [...prev, { param: "password", msg: "Your password cannot be empty." }])
        errMessage += "Your password has to be at least 4 characters. \n"; 
        isValid = false;
    }
    if (password !== confirmPass) {
        //setMessage(prev => [...prev, { param: "confirm_password", msg: "The passwords you typed are not the same." }])
        errMessage += "The passwords you typed are not the same. \n"; 
        isValid = false; 
    }

    if (isValid) {
        SendRegistrationRequest();
    }
    else {
        setMessage([{param: "error", msg: errMessage}])
    }
}

    type formDataType = {
        username?: string,
        password: string,
        email: string,
    }

    const SendRegistrationRequest = async () => {
        const fetchUrl = `api/auth/register`
        setLoading(true)
        await fetch(fetchUrl, {
            method: "POST", 
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-Type' : 'application/json', 
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (!response.ok) {
                    setMessage([{ param: "error", msg: `Error: ${result.error}` }])
                }
                else {
                    await signIn("credentials", {
                        email: result.email,
                        name: result.username,
                        image: result.profile_pic,
                        ObjectId: result._id,
                        isNewAccount: true,
                    })
                }
            })
            .catch(e => {
                console.log("error: ", e)
                setMessage([{ param: "error", msg: `Error: ${e.message}` }])
                setLoading(false)
            })
        setLoading(false)
    }

    const HandleSignIn = async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (validateSignIn()) {
            const FetchUrl = `api/auth/signin/${username}/${password}`;
            setLoading(true); 
            try {
                const response = await axios.get(FetchUrl)
                const result = await response.data;
                if (response.status === 200) {
                    signIn("credentials", {
                        email: result.email,
                        name: result.username,
                        image: result.profile_pic,
                        ObjectId: result._id,
                        isNewAccount: false,
                    })
                    setLoading(false)
                    GoHome(); 
                }
            } catch (error) {
                setLoading(false)
                console.log("Sign in error: ", error)
            }
            setLoading(false)
        }
    }

    const validateSignIn = (): boolean => {
        let errMessage = 'Error: \n';
        let isValid = true;
        if (username && username.length <= 0) {
            errMessage += "Your email cannot be blank. \n";
            isValid = false;
        }
        if (password.length < 4) {
            errMessage += "Your password must be at least 4 characters long. \n"
        }
        setMessage([{param: "error", msg: errMessage}])
        return isValid; 
    }

    return {
        SubmitRegistration,
        HandleSignIn
    }

}

const ServerReadHooks = () => {
    const RetrieveID = async (email: string) => {
        await db.connect();
        try {
            const user = await Users.findOne({ email: email })
            if (user) {
                return user._id;
            }
            else {
                return null
            }
        } catch (error: any) {
            console.log("ServerReadHooks error: ", error.message as string)
        }
    }
    return {
        RetrieveID
    }
}

const ServerWriteHooks = () => {
    const CreateNewAccount = async ({ name, email, image }: CreateNewAccountInt) => {
        const userObj = {
            username: name, 
            email, 
        }
        const result = new Users(userObj)

        const newUser = await result.save()
            .catch((error: any) => {
                throw new Error(error)
            })
        return newUser; 
    }
    return {
        CreateNewAccount
    }
}


export {
    SubmitHooks,
    ServerReadHooks,
    ServerWriteHooks, 
}