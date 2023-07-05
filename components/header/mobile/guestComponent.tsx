import {
    GoSignUpLink,
    CloseMenuLink
} from './links';

type context = {
    element: HTMLDivElement | null,
}


const GuestComponent = (props: context) => {

    const closeMenu = (element: HTMLDivElement) => {
        element?.classList.remove("fadeIn")
        element?.classList.add("fadeOut");
    }

    return(
        <>
            <GoSignUpLink closeMenu={closeMenu} />
            <CloseMenuLink closeMenu={closeMenu} />
        </>
    )
}

export default GuestComponent; 