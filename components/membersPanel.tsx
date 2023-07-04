
import dynamic from 'next/dynamic'; 
import { SignOutButton } from './button'; 
const Panel = dynamic(() => import("./panel"), {
    loading: ()=><div>Loading...</div>
})
const MembersPanel = () => {
    return (
        <Panel>
            <SignOutButton />
        </Panel>
    )
}

export default MembersPanel; 