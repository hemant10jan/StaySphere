import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from '../../../libs/prismadb';
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


const handler = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        Google({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }),
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        Credentials({
            name:"credentials",
            credentials:{
              email:{label:"Email",type:"text"},
              password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
              if(!credentials?.email || !credentials?.password){
                throw new Error("Email and password are required.")
              }

              const user=await prisma.user.findUnique({
                where:{
                  email:credentials.email
                }
              })

              if(!user || !user?.hashedPassword){
                throw new Error("Invalid email and password.")
              }

              const isCorrectPassword=await bcrypt.compare(
                credentials.password,
                user.hashedPassword
              )

              if(!isCorrectPassword){
                throw new Error("Invalid credentials")
              }

              return user;
            }
        })
    ],
    pages:{
        signIn:"/",
    },
    debug:process.env.NODE_ENV === "development",
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
})
  
export { handler as GET, handler as POST }


