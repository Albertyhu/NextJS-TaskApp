
import React, { PropsWithChildren, Component } from 'react'; 
import RenderItem from '@/components/userComponents/userItem';
import { userInterface } from '@/_util/interface';
import uuid from 'react-uuid'; 

type propsType = {
    userList: Array<userInterface> | [], 
}

const RenderList: React.FC<propsType> = (props): JSX.Element => {
    const { userList } = props;
    return (
        <React.Fragment>
            {userList && userList.length > 0 &&
                userList.map((item: userInterface) => <RenderItem key={uuid()} username={item.username} />)}
        </React.Fragment>
    )
}

export default RenderList; 