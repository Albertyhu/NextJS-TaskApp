'use client'
import { useState } from 'react'; 
import { TextInput } from '../../formElements'; 
import { AddTaskButton } from '../buttons'; 
interface AddProps {

    setOpenPrompt: (c: boolean) => void,
}

const RenderSection = (props : AddProps) : React.ReactElement => {
    const {
        setOpenPrompt, 
    } = props; 

    const [newTask, setNewTask] = useState<string>("")

    const handleOnChange = (evt: React.FormEvent<HTMLInputElement>): void => {
        evt.preventDefault(); 
        setNewTask((evt.target as HTMLTextAreaElement).value)
    } 

    return (
        <div
            id="AddTaskPanel"
            className = 'flex my-10 gap-5'
        >
            <TextInput
                label="Add a new task"
                value={newTask}
                onChangeHandler={handleOnChange}
                placeHolderText="Enter new task"
                type="text"
            />
            <AddTaskButton
                newTask={newTask}
                setOpenPrompt={setOpenPrompt} 
            />
            <button
                className="btn-cancel my-auto"
                onClick={() => setOpenPrompt(false)}
            >
                Cancel
            </button>
        </div>
    )
}

export default RenderSection; 