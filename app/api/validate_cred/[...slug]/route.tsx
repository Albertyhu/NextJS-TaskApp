import { compare } from 'bcrypt';
import Users from '@/model/user';
import db from '@/lib/mongooseConnect'; 
type paramsType = {
    params: {
        slug: Array<string>, 
    }
}
export async function GET(req : Request, { params } : paramsType) {
    const email = params.slug[0];
    const password = params.slug[1]; 
    console.log("fired")
    await db.connect();
    try {
        const user = await Users.findOne({ email: email })
            .select("email password")
            .catch(error => {
                return new Response(JSON.stringify({ error }), { status: 400 })
            })
        if (!user) {
            const message = "That email does not exist in our database."
            return new Response(JSON.stringify({message}), {status: 400})
        }
        if (!compare(password, user?.password)) {
            const message = "The password you typed is incorrect."
            return new Response(JSON.stringify({ message }), { status: 400 })
        }
        return new Response(JSON.stringify(null), {status: 200})
    } catch (error) {
        console.log("ValidateCredentials error: ", error.message)
        return new Response(JSON.stringify({error}), { status: 500 })
    }
}