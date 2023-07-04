import LoadingComponent from '@/components/loadingComponent'; 
import db from '@/lib/mongooseConnect';
import Users from '@/model/user';
import {
    userInterface,
} from "@/_util/interface";
import { UserServerHooks} from "@/_hooks/userHooks"
import { UserHooks } from '@/_hooks/userHooks';
//import RenderList from "./renderList";
import dynamic from 'next/dynamic'; 
const RenderList = dynamic(() => import("./renderList"), {
    loading: () => <LoadingComponent entirePage={true}  />
}); 

const RenderAllUsers = async (): Promise<JSX.Element> => {
    await db.connect();
    const {
        RetrieveUsers, 
    } = UserServerHooks(); 

    const userList: Array<userInterface> | [] = await RetrieveUsers(); 

    return (
            <RenderList userList={userList} />
    )

}

export default RenderAllUsers; 

