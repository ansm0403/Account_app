import { User } from '@/model/user';
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions : NextAuthOptions = {
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string
        }),
      ],
      callbacks : {
        session({session, token}){
            if(session.user){
                (session.user as User).id = token.sub as string;
            }
            return session;
        }
      },
      session : {
        strategy : 'jwt',
      },
      pages : {
        signIn : '/auth/signin',
      }

}