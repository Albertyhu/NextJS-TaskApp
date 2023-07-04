import React from 'react';
import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

const SentryAnim: React.FC<{ entirePage?: boolean }> = (props) : React.ReactElement => {
    const {
        entirePage = true, 
    } = props; 

    const loadingStyle = "absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
    const wholePage = "w-full h-full inset-0 bg-[rgba(255,255,255,0.7)] z-[25] fixed top-0"
    const modular = "w-full h-full inset-0 bg-[rgba(255,255,255,0.7)] z-[25] relative m-auto"
    return (
        <div
            id="SentryAnimation"
            className={`${entirePage ? wholePage : modular}`}>
            <div className="w-full h-full relative">
                <Sentry
                    color="#333333"
                    size={100}
                    speed={1}
                    animating={true}
                    className={loadingStyle}
                />
            </div>
        </div>
    )
}

export default SentryAnim; 
