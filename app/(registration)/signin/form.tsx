'use client'
import {
    useState,
    useContext,
    useCallback,
} from 'react';
import { AppContext } from '@/_util/contextItems'
import {
    TextInput,
    FormButtons,
} from '@/components/formElements';
import { SubmitHooks } from '@/_hooks/authHooks';
import { useRouter } from 'next/navigation';
import { GlobalInterface } from '@/_util/interface'; 

const RenderSignUpForm = (): React.ReactElement => {

    const {
        setMessage,
        setLoading,
    } = useContext(AppContext) as GlobalInterface; 

    const router = useRouter();

    const [username, setUsername] = useState<string>("");

    const handleUsernameChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setUsername((evt.target as HTMLTextAreaElement).value);
    }

    const [password, setPass] = useState<string>('');
    const handlePassChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setPass((evt.target as HTMLTextAreaElement).value);
    }

    const { HandleSignIn } = SubmitHooks({
        username,
        password,
        setMessage,
        setLoading, 
    })

    return (
        <form
            onSubmit={HandleSignIn}
        >
            <h1
                className="text-2xl text-center"
            >Sign in</h1>
            <TextInput
                label="Username"
                value={username}
                onChangeHandler={handleUsernameChange}
                placeHolderText="Enter your username"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeHandler={handlePassChange}
                placeHolderText="Enter your password"
                type="password"
            />
            <FormButtons
            />
        </form>
    )
}

export default RenderSignUpForm; 