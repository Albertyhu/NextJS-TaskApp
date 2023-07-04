import { LogoComponent } from '../menuLinks';
import dynamic from 'next/dynamic'; 
import LoadingComponent from '../../loadingComponent'; 
const MobileIcon = dynamic(() => import("./mobileIcon"), {
    loading: () => <LoadingComponent entirePage={false} />
}); 
const MobileMenu = dynamic(()=> import("./mobileMenu"), {
    loading: () => <LoadingComponent entirePage={false} />
})

const MobileHeader = (): React.ReactElement => {
    return (
        <div
            id="MobileHeader"
            className="flex md:hidden w-full min-h-[50px] relative justify-between bg-black absolute inset-0 [&>*]:inline-block"
        >
            <LogoComponent />      
            <div
                className="relative my-auto z-50 cursor-pointer px-5 [&>*]:select-none"
                id="MobileIconWrapper"
            >
                <MobileIcon />
            </div>
            <MobileMenu />
        </div>
    )
}

export default MobileHeader; 