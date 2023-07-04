'use client'
import { useState, useEffect } from 'react';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { UserHooks } from '@/_hooks/userHooks';
import RenderUser from "@/components/userComponents/renderUser";
import { userInterface } from '@/_util/interface'
interface paramContext{
    params: {
        username: string, 
    }
    searchParams?: object, 
}

const RenderOneUser = (obj: paramContext): React.ReactElement => {

    const router = useRouter();
    const searchParams = useSearchParams()

    const { GetOneUser } = UserHooks()

    const [user, setUser] = useState<userInterface| null>(null)
    let username = obj.params.username; 
    useEffect(() => {
        GetOneUser({ setUser, username })
    }, [obj.params.username])

    return (
        <div>
            {user &&
                <RenderUser {...user} />
            }
        </div>
    )
}

export default RenderOneUser; 