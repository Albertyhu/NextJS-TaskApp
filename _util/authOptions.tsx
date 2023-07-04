import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import {
    ServerReadHooks,
    ServerWriteHooks,
} from '@/_hooks/authHooks';
import { CreateNewAccountInt } from '@/_util/interface'

const { RetrieveID } = ServerReadHooks(); 
const { CreateNewAccount } = ServerWriteHooks(); 

export const authOptions : NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            let ObjectId = await RetrieveID(token.email as string);
            
            if (ObjectId === null) {
                const name = token.name;
                const email = token.email;
                const image = token.picture; 
                const newUser = await CreateNewAccount ({ name, email, image })
                ObjectId = newUser._id; 
            }
            session.user.ObjectId = ObjectId;  
            return session
        },
        async jwt({ token, user, account, profile }) {

            return token
        }
    }
}

