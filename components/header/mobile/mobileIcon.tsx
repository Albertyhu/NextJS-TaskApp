'use client'
import Icon from "@/_assets/icons/hamburger_menu_white.png"
import Image from 'next/image'; 
import {
    HeaderBarType, 
} from '@/_util/interface'; 

import { 
    useContext,
    useEffect, 
} from 'react'; 
import {
    HeaderBarContext, 
} from '@/_util/contextItems'; 

const MobileIcon = (): React.ReactElement => {
    const {
        MobileMenuRef, 
        MobileIconRef,
        openMenu, 
    } = useContext(HeaderBarContext) as HeaderBarType; 

    return (
        <Image
            src={Icon}
            width={30}
            height={30}
            alt="Mobile Icon"
            ref={MobileIconRef}
            onClick={() => openMenu(MobileMenuRef.current)}
        />
    )
}

export default MobileIcon; 