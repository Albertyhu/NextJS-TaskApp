import {
    GoSignIn,
    GoSignUp,
} from '@/components/button'; 
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/_util/authOptions';
import {
    SessionInterface,
    tokenInterface,
    taskType,
    listItem, 
} from '@/_util/interface'; 
import dynamic from 'next/dynamic'; 
import AuthPanel from '@/components/authPanel'; 
import LoadingComponent from '@/components/loadingComponent';
const Panel = dynamic(() => import("@/components/panel"), {
    loading: ()=><LoadingComponent />
})
const ToDoComponent = dynamic(() => import('@/components/todoComponents') as any, {
    loading: ()=><LoadingComponent />
}); 

export default async function Home() {

    const session: SessionInterface | null = await getServerSession(authOptions as any); 

    return (
        <main className="flex min-h-screen flex-col items-center">
            {session ?
                <ToDoComponent />
                :
                <AuthPanel />
            }
        </main>
    )
}

