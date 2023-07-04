import User from "@/model/user";
import Task from "@/model/task";
import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/lib/mongooseConnect";
import {
    NextResponse,
    NextRequest,
} from 'next/server'
/**
 * This is for retrieving list of tasks base on user's name. 
 * 
 */

type paramsType = {
    params: {
        userId: string,
    }
}
export async function GET(req: NextRequest, { params }: paramsType) {
    const userId = params.userId; 
    
    try {
      //  await db.connect();
        const user = await User.findById(userId)
            .select("tasks")
            .populate({
                path: "tasks",
                options: {
                    sort: { dateCreated: -1 }
                }
            })
            .catch(error => {
                console.log("Error in retrieving list: ", error)
                throw new Error(error)
            })
        const list = user.tasks; 
        return new NextResponse(JSON.stringify(list), { status: 200 })
    }
    catch (error) {
        console.log("Internal server error: [retrieving current user\'s list]", error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }

}

