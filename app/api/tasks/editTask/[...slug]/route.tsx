import User from "@/model/user";
import Task from "@/model/task";
import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/lib/mongooseConnect";
import {
    NextResponse,
    NextRequest,
} from 'next/server'



type paramsType = {
    params: {
        slug: Array<string>,
    }
}
export async function PUT(req: NextRequest, { params }: paramsType) {
    const userId = params.slug[0];
    const taskId = params.slug[1];
    const data = await req.json(); 
    const {
         name, 
    } = data;  
    try {
        //confirm that the task belongs to the user
        const user = await User.findOne({ tasks: { $in: [taskId] } })
            .catch(error => {
                return new NextResponse(JSON.stringify({ error }), { status: 404 })
            })
        if (!user) {
            const error = "This task does not belong to any user."; 
            return new NextResponse(JSON.stringify({ error }), { status: 404 })
        }
        if (user && userId.toString() !== user._id.toString()) {
            const error = "Unauthorized action. The task does not belong to the current user";
            return new NextResponse(JSON.stringify({ error }), { status: 401 })
        }
        const updateResult = await Task.findByIdAndUpdate(taskId, {
            name: name,
        }, {new: true})
            .catch(error => {
                return new NextResponse(JSON.stringify({ error }), {status: 500})
            })
        console.log("updateResult: ", updateResult)
        return new NextResponse(JSON.stringify(updateResult), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }

}