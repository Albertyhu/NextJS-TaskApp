import { Base64Hooks } from './imageHooks'
import {
    userInterface,
} from '@/_util/interface';
import type { GetServerSideProps } from 'next'
import axios from 'axios'; 
import db from '@/lib/mongooseConnect';
import Users from '@/model/user';


const UserHooks = () => {
    const {
        convertObjToBase64
    } = Base64Hooks(); 
    interface GetUsersContext {
        setUsers: (c: Array<userInterface>) => void,
    }
    const GetAndSetUsers = async ({setUsers}: GetUsersContext) => {
        try {
            const fetchURL = `api/get_users`
            const response = await fetch(fetchURL, { cache: 'no-store' })

            const result = await response.json();
            if (response.status == 200) {
                setUsers(result)
            }
            else {
                console.log("GetAndSetUsers failed")
            }
        } catch (e) {
            console.log("GetAndSetUsers error: ", e)
        }
    }

    const RetrieveUsers = async () => {
        try {
            const fetchURL = "api/get_users"
            console.log("fetchURL: ", fetchURL)
            const response = await axios.get(fetchURL)
            const result = response.data; 
            if (response.status === 200) {
                return result; 
            }
            else {
                console.log("RetrieveUsers failed: ", result.error)
            }
        } catch (e: any) {
            console.log("RetrieveUsers error: ", e.message as string)
        }
    }

    interface GetOneUserContext {
        setUser: (c: userInterface) => void, 
        username: string, 
    }

    const GetOneUser = async ({ setUser, username }: GetOneUserContext) => {
        try {
            const fetchURL = `api/get_one_user/${username}`
            
            await fetch(fetchURL, {
                method: "GET",
                cache: 'no-store'
            })
                .then(async response => {
                    const result = await response.json(); 
                    if (!response.ok) {
                        console.log("GetOneUser fetch error")
                        return; 
                    }
                    if (result.profile_pic) {
                        result.profile_pic = convertObjToBase64(result.profile_pic)
                    }
                    setUser(result)
                })

        } catch (e) {
            console.log("GetOneUser error: ", e)

        }
    }

    const GetAllUserNames = async ({ setUsers }: GetUsersContext) => {
        try {
            const fetchURL = `api/get_all_usernames`
            const response = await fetch(fetchURL, { cache: 'no-store' })

            const result = await response.json();
            if (response.status == 200) {
                const users = result.map((item: userInterface) => {
                    return {
                        username: item.username,
                    }
                })
                setUsers(users)
            }
            else {
                console.log("GetAllUserNames failed")
            }

        } catch (e) {
            console.log("GetAllUserNames error: ", e)
        }
    }

    const GetCurrentUser = ({ userID }: {userID : string}) => {
        const fetchURL = `api/${userID}`

    }

    return {
        GetAndSetUsers,
        RetrieveUsers, 
        GetOneUser, 
        GetAllUserNames 
    }
}

const UserServerHooks = () => {
    //server function
    const RetrieveUsers = async () => {
        try {
           // await db.connect();
            const users = await Users.find({})
                .select('username email joinedDate posts profile_pic coverPhoto biography SocialMediaLinks message')
            return users;

        } catch (e) {
            console.log("Retrieve Error: ", e)
            return [];
        }
    }

    return {RetrieveUsers}
}

export {
    UserHooks,
    UserServerHooks,
}