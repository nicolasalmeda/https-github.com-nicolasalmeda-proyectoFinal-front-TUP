import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'

const adminEmails = ['nico101096@gmail.com']

export default NextAuth ({
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session
      }else{
        return false
      }
      
    },
  }
})

// export default NextAuth(authOption)
// export async function isAdminRequest(req,res){
//   const session = await getServerSession(req,res,authOption)
//   if(!adminEmails.includes(session?.user?.email)){
//     res.status(401);
//     res.end();
//     throw 'Usted no es administrador'}
// }