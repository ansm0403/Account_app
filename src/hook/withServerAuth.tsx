import { authOptions } from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { ComponentType } from 'react'

function withServerAuth<Props = Record<string, never>>(
    WrappedComponent: ComponentType<Props>,
  ) {
    return async function AuthenticatedComponent(props: Props) {
  
      const session = await getServerSession(authOptions);
        
      if(!session) {
        redirect('/auth/signin');
      } 

      return <WrappedComponent {...(props as any)} />
    }
  }
  
  export default withServerAuth
  
