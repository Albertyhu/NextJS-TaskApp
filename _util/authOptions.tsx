import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import {
    ServerReadHooks,
    ServerWriteHooks,
} from '@/_hooks/authHooks'

const { RetrieveID } = ServerReadHooks(); 
const { CreateNewAccount } = ServerWriteHooks(); 

export const authOptions : NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXT_AUTH_SECRET,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            let ObjectId = await RetrieveID(token.email);
            if (ObjectId === null) {
                const {
                    name,
                    email,
                    image, 
                } = token; 
                const newUser = await CreateNewAccount({ name, email, image })
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

