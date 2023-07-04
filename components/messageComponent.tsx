'use client'
import { useEffect, useRef, useContext } from 'react'; 
import uuid from 'react-uuid';
import PropTypes from 'prop-types'; 
import { AppContext } from '@/_util/contextItems'
import {
    GlobalInterface,
} from '@/_util/interface'; 

//this is component is for displaying messages that notifies user of when their post is saved, or when their comments are submitted, etc.
interface MsgObj {
    param?: string,
    msg?: string,
}
 
const MessageComponent = () => {
    const {
        message,
        setMessage,
    } = useContext(AppContext) as GlobalInterface; 

    const messageRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if (message && message.length > 0 && messageRef.current) {
            for (var child of (messageRef.current?.children as any)) {
                AnimateMessage(child, setMessage)
            }
        }
    }, [message])

    return (
        <div
            id="message"
            className="relative w-full h-full"
            ref={messageRef}
        >
            {message != null && message.length > 0 && RenderMessage(message)}
        </div>
        )
}

export default MessageComponent; 

MessageComponent.propTypes = {
    message: PropTypes.string,
    setMessage: PropTypes.func,
}

function RenderMessage(message: Array<MsgObj>): Array<React.ReactElement> {
    //Dont use any hooks here.  
    return message.map((item: MsgObj, index: Number) => {
        const ID = `${item.param}-${index}`;
        return <div
            key={uuid()}
            id={ID}
            className={`Message box-shadow`}>{item.msg}</div>
    })
}

function AnimateMessage(DivElem : HTMLDivElement | null, setMessage : Function): void {
    setTimeout(() => {
        DivElem?.classList?.remove("MessageFadeOut");
        DivElem?.classList?.add("MessageFadeIn");
    }, 1)
    setTimeout(() => {
        setMessage([]);
    }, 6000)
    setTimeout(() => {
        DivElem?.classList?.remove("MessageFadeIn")
        DivElem?.classList?.add("MessageFadeOut");
    }, 5000)
}