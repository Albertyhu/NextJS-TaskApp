import {
    SignOutLink,
    CloseMenuLink
} from './AccountMenu/accountMenuLinks'

type context = {
    element: HTMLDivElement | null, 
}

const MenuComponent = (props : context ) => {
    const {
        element
    } = props; 
    return(
        <>
            <SignOutLink element={element} />
            <CloseMenuLink element={element} />
        </>
    )
}

export default MenuComponent; 