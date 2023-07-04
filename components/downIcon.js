'use client'
import { useEffect } from 'react'; 
import DownArrow from '@/assets/icons/down.png';

const DownIcon = props => { 
    const { downwardsDirection } = props; 
    const ArrowStyle = `w-[20px] h-[20px] `; 
    const downwards = 'rotate-0';
    const upwards = 'rotate-180'; 
    var DownArrowElem = document.querySelector("#DownArrowWrapper");

    const faceDownwards = () => {
        DownArrowElem = document.querySelector("#DownArrowWrapper");

        DownArrowElem?.classList.remove('rotate-180');
        DownArrowElem?.classList.add('rotate-0');
    }

    const faceUpwards = () => {
        DownArrowElem = document.querySelector("#DownArrowWrapper");
        DownArrowElem?.classList.remove('rotate-0');
        DownArrowElem?.classList.add('rotate-180');
    }

    useEffect(() => {
        if (downwardsDirection) {
            faceDownwards(DownArrowElem);
        }
        else {
            faceUpwards(DownArrowElem); 
        }
    }, [downwardsDirection])

    useEffect(() => {
        DownArrowElem = document.querySelector("#DownArrowWrapper");
    }, [])

    return (
        <div
            id="DownArrowWrapper"
            className={`rotate-0 my-auto ml-[10px] inline-block select-none transition-[transform]`}> 
            <img
                id = "DownArrowIcon"
                src={DownArrow}
                className={`${ArrowStyle}`}
                alt="Down Arrow" />
        </div>
        )
}

export default DownIcon 