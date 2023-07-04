import { useRouter } from 'next/navigation'; 
import {
    SessionInterface,
    EditTaskContext,
    messageType, 
    listItem, 
    taskType, 
} from '@/_util/interface'; 
import axios from 'axios'; 

type WriteInterface = {
    userId: string | undefined, 
    setMessage: (c: Array<messageType> | []) => void | undefined,
    setLoading: (c: boolean) => void,
    setList: (c: Array<taskType>) => void, 
}
interface HandleSubmitContext {
    newTask: string,
    setList: (c: Array<object>) => void,
}

export const WriteHooks = ({userId, setMessage, setList, setLoading }: WriteInterface) => {
    const router = useRouter(); 

    interface AddTAskInterface {
        newTask: string, 
        setOpenPrompt: (c: boolean) => void, 
        taskList: Array<taskType>, 
    }

    const AddTask = async ({ newTask, setOpenPrompt, taskList }: AddTAskInterface) => {
        if (ValidateAddTask(userId, newTask)) {
            const FetchUrl = `api/tasks/addTask/${userId}/${newTask}`;
            try {
                setLoading(true)
                const response = await axios.put(FetchUrl)
                    .catch(error => {
                        console.log("Error", error.message)
                        throw new Error(error)
                    })
                const result = await response.data;
                var arr = [result, ...taskList]; 
                setList(arr); 
                setOpenPrompt(false)
                setLoading(false)
            }
            catch (error: any) {
                console.log("error: ", error.message)
                setLoading(false)
                setOpenPrompt(false)
                setMessage([{ msg: error.message, param: "error" }])
            }
        }
    }

    const EditTask = async ({ name, taskId, setEdit, taskList, setList, index }: EditTaskContext) => {
        const fetchURL = `api/tasks/editTask/${userId}/${taskId}`
        try {
            setLoading(true)
            const response = await axios.put(fetchURL, {
                name
            })
                .catch(error => {
                    console.log("Error", error.message)
                    throw new Error(error)
                })

            const result = response.data;
            var arr = [...taskList];
            arr.splice(index, 1, result);
            setList(arr);
            setEdit(false);
            setLoading(false)

        } catch (e: any) {
            console.log("error: ", e.message)
            setEdit(false);
            setLoading(false)
            setMessage([{msg: e.message, param: "error"}])
        }

    }

    const ValidateAddTask = (userId: string | undefined, newTask: string): boolean => {
        var isValid = true;
        if (!userId || userId.length === 0) {
            setMessage([{ msg: "User is not logged in.", param: "error" }])
            isValid = false;
        }
        if (!newTask || newTask.length === 0) {
            setMessage([{ msg: "the name of the task cannot be empty.", param: "error" }])
            isValid = false;
        }
        return isValid; 
    }

    const DeleteTask = async (userId: string | undefined, taskId: string, taskList: Array<taskType> | [] ) => {
        const FetchUrl: string = `api/tasks/delete/${userId}/${taskId}`; 
        setLoading(true)
        try {
            const response = await axios.put(FetchUrl)
                .catch(error => {
                    console.log("Error", error.message)
                    throw new Error(error)
                })
            const result = response.data;
            if (response.status === 200) {
                var arr = taskList.filter((val: taskType) => val._id.toString() !== taskId.toString()); 
                setList(arr); 
                setLoading(false)
                setMessage([{ msg: "The task has been deleted.", param: "Message" }])
            }
            else {
                console.log("DeleteTask Error 1: ", result.error)
                setLoading(false)
                setMessage([{msg: `Error: ${result.error}`}])
            }

        } catch (e: any) {
            console.log("DeleteTask Error 2: ", e.message)
            setLoading(false)
            setMessage([{ msg: `Error: ${e.message}` }])
        }
        setLoading(false)
    } 

    //it may need to update task item in list too 
    const UpdateTaskStatus = async (
        taskId: string,
        finished: boolean,
        setList: (c: Array<taskType>) => void,
        index: number
    ) => {
        const fetchURL = `api/tasks/updateStatus/${userId}/${taskId}`; 

        try {
            const response = await axios.put(fetchURL, {
                finished, 
            })
                .catch(error => {
                    console.log("Error", error.message)
                    throw new Error(error)
                })
        } catch (error: any) {
            console.log("error: ", error.message)
            setMessage([{ msg: error.message, param: "error" }])
        }
    }

    return {
        AddTask,
        EditTask,
        DeleteTask, 
        UpdateTaskStatus, 
    }
}

type ReadInterface = {
    userId: string | undefined,
    setMessage: (c: Array<messageType> | []) => void | undefined,
    setLoading: (c: boolean) => void,
}

interface SetTaskListByUserIDContext {
    setList: (c : Array<taskType> | []) =>void, 
}

export const ReadHooks = ({ userId, setMessage, setLoading } : ReadInterface) => {
    const SetTaskListByUserID = async ({setList} : SetTaskListByUserIDContext ) => {
        const FetchUrl = `api/tasks/${userId}`;
        try {
            setLoading(true); 
            const response = await axios.get(FetchUrl)
            const result = response.data;
            if (response.status === 200) {
                setList(result)
            }
            else {
                console.log("There was a problem trying to retrieve the current user\'s task list [error 1]: ", result.error)
            }
            setLoading(false)
        }
        catch (error) {
            console.log("There was a problem trying to retrieve the current user\'s task list [error 2]: ", error)
            setLoading(false)
        }
    }
    return {SetTaskListByUserID}
}


export const GetTaskListByUserId = async ({ userId }: { userId: string }) => {
    const FetchUrl = `api/tasks/${userId}`;
    const response = await axios.get(FetchUrl)
    const result = response.data;
    if (response.status === 200) {
        return result
    }
    else {
        console.log("error: ", result.error)
    }
}