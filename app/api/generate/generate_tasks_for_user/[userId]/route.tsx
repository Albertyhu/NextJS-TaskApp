import User from "@/model/user";
import Task from "@/model/task";
import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/lib/mongooseConnect";
import {
    NextResponse,
    NextRequest,
} from 'next/server'
import { genKey } from '@/_hooks/randGen'; 
import {
    newTaskType,
} from '@/_util/interface'
type paramsType = {
    params: {
        userId: string, 
    }
} 
export async function PUT(req: NextRequest, { params } : paramsType) {
    const userId = params.userId; 
    const data = await req.json(); 
    const { num } = data; 
    var newTasks: Array<newTaskType> = [] 
    for (var i = 0; i < num; i++) {
        var obj = {
            name: genKey(10), 
            dateCreated: new Date(), 
            finished: false, 
        }
        newTasks.push(obj)
    }
    try {
        const insertResult = await Task.insertMany(newTasks)

        const IdArray = insertResult.map(val => val._id); 

        const result = await User.updateOne({ _id: userId }, {
            $push: {
                tasks: {$each: IdArray}
}
        }).catch(error => {
            throw new Error(`There was an error updating the user: ${error}`)
        })

        return new NextResponse(JSON.stringify(null), { status: 200 })
    }
    catch (error){
        console.log("error: ", error)
    }

}
