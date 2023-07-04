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
    const taskName = params.slug[1];
    const taskObj = {
        name: taskName,
        dateCreated: new Date(),
        finished: false,
    }
    try {
       // await db.connect();
        const newTask = new Task(taskObj); 
        const savedTask = await newTask.save(); 
        if (!savedTask) {
            throw new Error("There was an issue creating a new task.")
        }
        const result = await User.findByIdAndUpdate(userId, {
            $addToSet: {tasks: newTask}
        }, {new: true})

        if (!result) {
            throw new Error("There a problem updating the user's data.")
        }

        return new NextResponse(JSON.stringify(savedTask), {status: 200})
    }
    catch (error) {
        return new NextResponse(JSON.stringify({error}), {status: 500})
    }

}

