'use client'
import { useContext } from 'react'; 
import { HeaderFunctions } from '@/_hooks/headerFunctions.jsx';
import { MenuLinksContext } from '@/_util/contextItem.jsx'; 
import HomeIcon from '@/assets/icons/home.png'

export const HomeButton = props => {
    const {
        CloseMobileMenu, 
    } = HeaderFunctions();
    const {
        clickEvent,
        MobileMenuRef, 
    } = props; 
    return (
        <div
            className="hover:underline flex" onClick={() => {
                clickEvent(); 
                CloseMobileMenu(MobileMenuRef)
            }}>
            <img
                src={HomeIcon}
                alt="home symbol"
                className="w-[25px] h-[25px]"

            />
            <span>Home</span>
        </div>
        )
}

export const Button = props => {
    const {
        title,
        clickEvent,
        icon,
    } = props;

    const {
        closeMenu,
    } = useContext(MenuLinksContext)

    return (
        <div
            id="Link"
            className="hover:underline flex [&>*]:mr-5" onClick={() => {
                if (clickEvent)
                    clickEvent();
                    closeMenu();
            }}>{icon()}
            <span>{title}</span>
        </div>
    )
}