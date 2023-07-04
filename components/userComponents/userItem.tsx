import React from 'react'; 

const Item: React.FC<{ username: string | null | undefined}> = (props): React.ReactElement => {
    const {
        username,
    } = props;
    return (
        <div
            id="user"
            className="bg-slate-300 text-slate-800 w-fit h-fit p-5 rounded-lg box_shadow mx-auto my-10"
        >{username}</div>
    )
}

export default Item; 