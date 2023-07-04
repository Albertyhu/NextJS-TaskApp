import db from '@/lib/mongooseConnect';
import Users from '@/model/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
interface paramsType {
    params: {
        user_name: string,
    } 
}

interface userContext {
    username: string,
}
export async function GET(req: NextRequest, { params } : paramsType) {
    await db.connect();
    try {
        const user = await Users.findOne({ username: params.user_name })
            .select('username email joinedDate posts profile_pic coverPhoto biography SocialMediaLinks message tasks')
            .populate({
                path: "tasks",
                options: {
                    sort: { dateCreated: -1 },
                }
            })
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (e) {
        console.log("Get_One_user Request Error: ", e)
        return new NextResponse(JSON.stringify(null),  { status: 500 })
    }
}


