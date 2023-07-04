'use client'
import React, {
    useState,
    ReactElement,
    useEffect, 
    useContext, 
} from 'react'; 
import dynamic from 'next/dynamic'; 
import {
    tokenInterface, 
} from "@/_util/interface";
import {
    AppContext
} from '../../_util/contextItems'; 
import {
    GlobalInterface,
} from '@/_util/interface'; 
import LoadingComponent from '../loadingComponent'; 
const Panel = dynamic(() => import("../panel"), {
    loading: () => <LoadingComponent entirePage={false}  />
}); 
const AddTaskPanel = dynamic(() => import("./addTask"), {
    loading: () => <LoadingComponent entirePage={false} />
}); 
const RenderList = dynamic(() => import("./renderList"), {
    loading: () => <LoadingComponent entirePage={false} />
}); 
 
const RenderTodo = async (): Promise<React.ReactElement> => {

    const {
        taskList
    } = useContext(AppContext) as GlobalInterface;

    const [openPrompt, setOpenPrompt] = useState<boolean>(false)

    return (
        <Panel>
            {openPrompt ? 
                <AddTaskPanel
                    setOpenPrompt={setOpenPrompt}
                />    
                : 
                <div
                    className = "w-full"
                >
                    <button
                        onClick={() => setOpenPrompt(true)}
                        className = "btn-primary mx-auto text-center"
                    >New task</button>
                </div>
            }
            {taskList && taskList.length > 0 ? 
                <RenderList
                />
                : 
                <p className = "mx-auto my-10 text-center">There are currently no tasks in your To-Do list.</p>
            }
        </Panel>
    )

}

export default RenderTodo; 