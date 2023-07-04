import { useRouter } from 'next/navigation';  

type TextInputProps = {
    label: string, 
    value: string , 
    onChangeHandler: Function, 
    placeHolderText: string, 
    type?: string, 
}
const TextInput = ({ label, value, onChangeHandler, placeHolderText, type = 'text'} : TextInputProps ) : React.ReactElement => {
    return (
        <div
            className = "grid w-full my-10"
        >
            <label
                className="text-black uppercase font-bold"
            >{label}</label>
            <input
                value={value}
                onChange={evt => onChangeHandler(evt)}
                placeholder={placeHolderText}
                type={type}
                className = "text-black border-slate-300 rounded-lg placeholder:text-base p-1 outline-slate-300 border-2"
                /> 
        </div>
    )
}


const FormButtons = () : React.ReactElement => {
    const router = useRouter(); 
    const UniversalStyle = `rounded-full px-[10px] py-1 sm:px-[12px] active:translate-x-[5px] text-xl
    active:translate-y-[5px] select-none  cursor-pointer sm:w-[150px] text-center w-fit my-5`

    const SubmitStyle = `!active:bg-[#C6C6C6] border-[#dbdbdb] border-2 
    text-black mx-auto hover:bg-gray-300 !bg-[#dbdbdb] ${UniversalStyle}`;

    const CancelStyle = `!active:bg-[#4B4B4B] border-white border-2 
    text-white mx-auto hover:bg-gray-300 !bg-[#333333] ${UniversalStyle}`;

    return (
        <div id="ButtonWrapper"
            className="grid grid-cols-2"
        >
            <button
                type="submit"
                className={SubmitStyle}
                value="Submit"
            >Submit</button>
            <button
                type="button"
                className={CancelStyle}
                value="Cancel"
                onClick={()=>router.push("/")}
            >Cancel</button>
        </div>
    )
}


export {
    TextInput,
    FormButtons, 
}