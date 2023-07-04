import User from "@/model/user";
import Task from "@/model/task";
import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/lib/mongooseConnect";
import {
    NextResponse,
    NextRequest,
} from 'next/server'

//delete task
//update user

type paramsType = {
    params: {
        slug: Array<string>,
    }
}
export async function PUT(req: NextRequest, { params }: paramsType) {
    const userId = params.slug[0];
    const taskID = params.slug[1];
    try {
        const deleteResult = await Task.deleteOne({ _id: taskID })
            .catch(error => {
                throw new Error("There was an error in deleting the task.")
            })

        const result = await User.findByIdAndUpdate(userId, {
            $pull: { tasks: taskID }
        })
            .catch(error => {
                throw new Error("There was an error in the attempt to update the user.")
            })
        return new NextResponse(JSON.stringify(null), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }

}