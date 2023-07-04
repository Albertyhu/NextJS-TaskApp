import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/model/user';
import db from '@/lib/mongooseConnect';

type Feedback = {
    username: string, 
    email: string, 
    password: string, 
}

export async function POST(req: NextRequest & { json:any }) {
    const data: Feedback = await req.json();
    const {
        username,
        email,
        password
    } = data;

    interface userListContext {
        username: string,
        email: string, 
    }
    try {
        await db.connect();
        const userList: Array<userListContext> = await User.find({})
            .select("username email")

        if (userList.some((val: userListContext) => val.username === username)) {
            let error = "That username already exists. Try again.";
            return new NextResponse(JSON.stringify({ error }), { status: 404, statusText: "Username already exists. Try again." })
        }

        if (userList.some((val: userListContext) => val.email === email)) {
            let error = "The email you type already exists. Try again.";
            return new NextResponse(JSON.stringify({ error }), { status: 404, statusText: "The email you type already exists. Try again." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            joinedDate: new Date(), 
        }
        const newUser = new User(user)
        var result = await newUser.save()
            .catch(error => {
                throw new Error(error)
            })
        result["password"] = undefined;
        const userData = {
            username,
            email,
        }

        return new NextResponse(JSON.stringify(result), { status: 200, statusText: "Account is successfully created." })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500, statusText: `Error: ${error}` })

    }
}
