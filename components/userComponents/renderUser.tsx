import Image from 'next/image'
import { userInterface } from "@/_util/interface"; 

const RenderUser = (props: userInterface): React.ReactElement => {
    const {
        username,
        //email,
        //joinedDate,
        //posts,
        //profile_pic,
        //coverPhoto,
        biography,
        //SocialMediaLinks,
        //message
    } = props; 

    return ( 
        <div
            className = "my-10"
        >
            {username && <h1 className = "font-bold text-2xl text-center">{username}</h1>}
            {biography && 
                <div>{biography}</div>}
        </div>
    )
} 

export default RenderUser; 