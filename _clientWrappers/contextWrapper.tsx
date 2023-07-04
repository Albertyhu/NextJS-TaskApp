'use client'
import {
    useState,
    useRef,
    useEffect, 
} from 'react'
import { AppContext } from '@/_util/contextItems'; 
import RenderLoading from '@/components/loadingComponent'; 
import {
    SessionInterface, 
    messageType, 
    GlobalInterface, 
    taskType,
} from "@/_util/interface"; 
import { ReadHooks } from "@/_hooks/taskHooks";
interface contextInterface {
    children: React.ReactNode, 
    session: SessionInterface | undefined,
}

const AppContextComponent = ({ children, session }: contextInterface ): React.ReactElement => {
    const [message, setMessage] = useState<Array<messageType>>([])

    const [loading, setLoading] = useState<boolean>(false); 

    const containerRef = useRef<HTMLDivElement>(null);
    const [taskList, setList] = useState<Array<taskType> | []>([])
    const context: GlobalInterface = {
        message, 
        setMessage, 
        containerRef, 
        loading, 
        setLoading, 
        session, 
        taskList,
        setList, 
    } 
    const userId = session?.user?.ObjectId; 

    const { SetTaskListByUserID } = ReadHooks({ userId, setMessage, setLoading })

    useEffect(() => {
        if (session) {
            SetTaskListByUserID({ setList })
        }
    }, [session])

    return (
        <AppContext.Provider value={context}>
            {loading && <RenderLoading />}
            {children}
        </AppContext.Provider>
)
}

export {
    AppContextComponent, 
}