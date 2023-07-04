`use client`
import { useContext } from 'react';
import {
    AppContext,
} from '@/_util/contextItems';
import { WriteHooks } from '@/_hooks/taskHooks'; 
import {
    ListInterface,
    GlobalInterface, 
} from '@/_util/interface'; 
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; 
import { IconContext } from "react-icons";
interface AddTaskButtonContext {
    newTask: string,
    setOpenPrompt: (c: boolean) => void,
}

const SIZE = "18px"

const AddTaskButton = (props: AddTaskButtonContext ): React.ReactElement => {
    const {
        newTask,
        setOpenPrompt, 
    } = props; 
    const {
        setMessage, 
        setLoading, 
        taskList, 
        setList, 
        session, 
    } = useContext(AppContext) as GlobalInterface; 

    const userId = session?.user.ObjectId 

    const { AddTask } = WriteHooks({ userId, setMessage, setList, setLoading})
    return (
        <button
            className="btn-standard"
            onClick={() => AddTask({ newTask, setOpenPrompt, taskList })}
        >Add task</button>
    )
}

type DeleteProps = {
    taskId: string, 
} 

const DeleteTaskBTN = (props : DeleteProps): React.ReactElement => {
    const {
        taskId
    } = props; 
    const {
        setMessage,
        setLoading,
        session, 
        taskList, 
        setList, 
    } = useContext(AppContext) as GlobalInterface;
    const userId = session?.user.ObjectId; 
    const { DeleteTask } = WriteHooks({ userId, setMessage, setList, setLoading })
    const IconStyle = {
        color: "#ffffff", 
        size: SIZE,
    } 
    return (
        <IconContext.Provider value={IconStyle}>
            <button
                className="btn-delete flex flex-row mx-auto"
                onClick={() => DeleteTask(userId, taskId, taskList)} 
            >
                <AiOutlineDelete />
            </button>
        </IconContext.Provider>
    )
}

const EditBTN = (props): React.ReactElement => {
    const {
        taskId,
        name, 
        setEdit, 
        index
    } = props;
    const {
        setMessage,
        setLoading,
        session,
        taskList,
        setList,
    } = useContext(AppContext) as GlobalInterface;
    const userId = session?.user.ObjectId;
    const { EditTask } = WriteHooks({ userId, setMessage, setList, setLoading })
    return (
        <button
            className="btn-secondary flex flex-row mx-auto"
            onClick={() => EditTask({ name, taskId, setEdit, taskList, setList, index })}
        >
            Save Edit
        </button>
    )
}

type OpenEditType = {
    setEdit: (c: boolean) => void; 
}

const OpenEditBTN = (props : OpenEditType): React.ReactElement => {
    const {
        setEdit
    } = props; 
    const IconStyle = {
        color: "#ffffff",
        size: SIZE,
    }
    return (
        <IconContext.Provider value={IconStyle}>
            <button
                className="btn-secondary flex flex-row mx-auto"
                onClick={() =>setEdit(true)}
            >
                <AiOutlineEdit />
            </button>
        </IconContext.Provider>
)
}

export {
    AddTaskButton,
    DeleteTaskBTN, 
    EditBTN,
    OpenEditBTN,
}