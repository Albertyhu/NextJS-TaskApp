'use client'
import {
    useState,
    useContext,
} from 'react';
import { AppContext } from '@/_util/contextItems'
import {
    TextInput,
    FormButtons,
} from '@/components/formElements';
import { SubmitHooks } from '@/_hooks/authHooks';
import { useRouter } from 'next/navigation';

import { GlobalInterface } from '@/_util/interface'; 

type RenderSignUpProps = {

}

const RenderSignUpForm = (props: RenderSignUpProps): React.ReactElement => {

    const {
        setMessage,
        setLoading,
    } = useContext(AppContext) as GlobalInterface; 

    const router = useRouter();

    const [username, setName] = useState<string>("")
    const handleNameChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setName(((evt.target as HTMLTextAreaElement) as HTMLTextAreaElement).value);
    }

    const [email, setEmail] = useState('');
    const handleEmailChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setEmail((evt.target as HTMLTextAreaElement).value);
    }

    const [password, setPass] = useState('');
    const handlePassChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setPass((evt.target as HTMLTextAreaElement).value);
    }

    const [confirmPass, setConfirm] = useState('');

    const handleConfirmChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setConfirm((evt.target as HTMLTextAreaElement).value);
    }

    const { SubmitRegistration } = SubmitHooks({
        username,
        email,
        password,
        confirmPass,
        setMessage,
        setLoading, 
    })

    return (
        <form
            onSubmit={SubmitRegistration}
        >
            <h1
                className="text-2xl text-center"
            >Create an account</h1>
            <TextInput
                label="Username"
                value={username}
                onChangeHandler={handleNameChange}
                placeHolderText="Enter your user name"
            />
            <TextInput
                label="Email"
                value={email}
                onChangeHandler={handleEmailChange}
                placeHolderText="Enter your email"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeHandler={handlePassChange}
                placeHolderText="Enter your password"
                type="password"
            />
            <TextInput
                label="Confirm password"
                value={confirmPass}
                onChangeHandler={handleConfirmChange}
                placeHolderText="Enter your password here again to confirm it"
                type="password"
            />
            <FormButtons />
        </form>
    )
}

export default RenderSignUpForm; 