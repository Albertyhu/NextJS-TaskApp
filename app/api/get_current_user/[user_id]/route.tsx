import db from '@/lib/mongooseConnect';
import Users from '@/model/user';
import { NextApiRequest, NextApiResponse } from 'next';
import {
    NextResponse,
    NextRequest,
} from 'next/server'

interface paramsType {
    params: {
        user_id: string,
    }
}
export async function GET(req: NextRequest, { params }: paramsType) {
    await db.connect();
    try {
        const userId = params.user_id; 
        const result = await Users.findById(userId)
        if (!result) {
            console.log("There is nobody by that username. ")
            const error = "There is nobody by that username. "
            return new NextResponse(JSON.stringify(error), { status: 400 })
        }

        const user = {
            username: result.username,
            email: result.email,
            joinedDate: result.joinedDate,
            posts: result.posts,
            profile_pic: result.profile_pic,
            coverPhoto: result.coverPhoto,
            biography: result.biography,
            SocialMediaLinks: result.SocialMediaLinks,
            communitiesFollowed: result.communitiesFollowed,
            connection: result.connection,
            notifications: result.notifications,
            message: result.message,
            tasks: result.tasks,
            _id: result._id, 
        }

        return new NextResponse(JSON.stringify(user), { status: 400 })

    } catch (error) {
        console.log("There was a problem retrieving information about the current user: ", error)
        return new NextResponse(JSON.stringify(error), {status: 500})
    }
}