'use client'
import { useContext } from 'react'; 

import {
    GlobalInterface, 
} from '@/_util/interface'; 
import { AppContext } from '@/_util/contextItems'; 
import dynamic from 'next/dynamic'; 
import AuthPanel from '@/components/authPanel'; 
import LoadingComponent from '@/components/loadingComponent';

const ToDoComponent = dynamic(() => import('@/components/todoComponents') as any, {
    loading: ()=><LoadingComponent />
}); 

export default async function Home() {

    const { session } = useContext(AppContext) as GlobalInterface;

    return session ? <ToDoComponent /> : <AuthPanel />
            
    
}

