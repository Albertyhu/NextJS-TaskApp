import db from '@/lib/mongooseConnect'; 
import Users from '@/model/user';

export async function GET(req: Request) {
    await db.connect(); 
    try {
        const users = await Users.find({})
            .select('username email joinedDate posts profile_pic coverPhoto biography SocialMediaLinks message')
        return new Response(JSON.stringify(users), {status: 200})

    } catch (e) {
        console.log("Get_Users Error: ", e)
        return new Response(JSON.stringify({error: e}), { status: 500})
    }
} 


