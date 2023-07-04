`use client`
import React, {
    useState,
    useContext,
    useEffect,
} from 'react'; 
import {
    AppContext,
} from '@/_util/contextItems'; 
import { WriteHooks } from '@/_hooks/taskHooks'; 
import {
    GlobalInterface,
} from "@/_util/interface"; 
import {
    DeleteTaskBTN,
    EditBTN, 
    OpenEditBTN, 
} from './buttons'

const RenderList: React.FC = () : React.ReactElement<any> => {
    const {
        taskList
    } = useContext(AppContext) as GlobalInterface;

    return (
        <ul
            className="list-inside list-none"
        >
            {taskList.map((item, index) => <ListItem
                key={item._id}
                {...item}
                index={index}
            />)}
        </ul>
    )
} 

interface ItemProps {
    index: number, 
    name: string,
    dateCreated: number,
    finished?: boolean,
    _id: string, 
}

const ListItem = (props: ItemProps): React.ReactElement => {
    const {
        name, 
        dateCreated, 
        finished, 
        _id, 
        index,
    } = props;
    const {
        setMessage,
        setLoading,
        session, 
        setList, 
        taskList, 
    } = useContext(AppContext) as GlobalInterface; 

    const userId : string | undefined = session?.user.ObjectId;
    const {
        UpdateTaskStatus
    } = WriteHooks({ userId, setMessage, setList, setLoading })
    const [editMode, setEdit] = useState<boolean>(false)
    const [newTask, setNew] = useState<string>(name); 
    const [status, setStatus] = useState<boolean | undefined>(finished); 
    const handleEditChange = (evt: React.FormEvent<HTMLInputElement>): void => {
        setNew((evt.target as HTMLTextAreaElement).value)
    } 

    const toggleTaskStatus = async () => {
        await UpdateTaskStatus(_id, !status, setList, index);
        setStatus(prev => !prev)
    }

    return (
        <div
            className = "my-10 gap-5 relative"
        >
            {!editMode ?
                <div className= 'grid md:flex md:flex-column w-full hover:bg-slate-300  rounded-lg p-1'>
                    <div
                        className= "relative [&>*]:justify-center absolute top-[-50%] translate-y-[25%]"
                    >
                        <input type="checkbox" className="peer mr-5 w-5 h-5 cursor-pointer align-middle" name="name" checked={status} onChange={toggleTaskStatus} />
                        <label
                            className= "font-bold peer-checked:line-through peer-checked:decoration-2"
                        >{name}</label>
                    </div>
                    <div className ="flex flex-row justify-between gap-10 mx-auto md:mr-0 md:ml-auto">
                        <OpenEditBTN  setEdit={setEdit} />
                        <DeleteTaskBTN
                        taskId={_id}
                        />
                    </div>
                </div>
                :
                <div
                    className ="grid md:flex md:gap-5"
                >
                    <input
                        type="text"
                        value={newTask}
                        className="text-black border-slate-300 rounded-lg placeholder:text-base p-1 outline-slate-300 border-2 mx-auto md:ml-0 md:mr-auto w-full"
                        onChange={handleEditChange}
                        placeholder="Type name of the task"
                    />
                    <div className="flex flex-row justify-between gap-10 md:mr-0 md:ml-auto mt-5">
                        <EditBTN
                            taskId={_id}
                            name={newTask}
                            setEdit={setEdit}
                            index={index}
                        />
                        <button
                            className="btn-standard my-auto"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    )

}
export default RenderList; 