import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    ServerReadHooks,
    ServerWriteHooks,
} from '@/_hooks/authHooks';
import {
    CustomCredentials,
} from '@/_util/interface';
import { compare } from 'bcrypt';
import Users from '@/model/user';

const {
    RetrieveID,
} = ServerReadHooks(); 
const { CreateNewAccount } = ServerWriteHooks(); 

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            credentials: {
                email: { label: "email", type: "text", placeholder: "example@mail.com" },
                password: { label: "Password", type: "password" }, 
            },
            async authorize(credentials: CustomCredentials) {
                
                if (!credentials) {
                    return false
                } 

                const {
                    email,
                    password,
                } = credentials;
                const data = await Users.findOne({ email: email.toLowerCase() })
                    .select("email password")
                if (!data) {
                    return false; 
                }
                const isPassValid = await compare(password, data.password)
                if (!isPassValid) {
                    return false 
                }
                var user = {
                    name: credentials.username as string, 
                    email: credentials.email as string, 
                    password: credentials.email as string, 
                    isNewUser: credentials.isNewUser as boolean, 
                    ObjectId: credentials.ObjectId as string, 
                }
                return user as any; 
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async signIn({ user, account, profile, credentials }) { 
            if (account.provider == "credentials") {
                let isValid = true; 

                return isValid; 
            }
            if (account.provider === 'google') {
                return true; 
            }
            if (account.provider === 'github') {
                return true;
            }
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
                const newUser = await CreateNewAccount({ name, email, image })
                ObjectId = newUser._id; 
            }
            if (session.user.name === undefined) {
                const data = await Users.findOne({ email: token.email.toLowerCase() })
                    .select("username")
                session.user.name = data.username;
            }
            session.user.ObjectId = ObjectId;  
            return session
        },
        async jwt({ token, user, account, profile }) {
            return token
        }
    }
}

