import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { UserDetailContext } from '@/data/context/UserDetailContext'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import uuid4 from 'uuid4'

  
//   @ts-ignore
const LoginDialog = ({openDialog,closeDialog}) => {
    const {userDetail,setUserDetail}=useContext<any>(UserDetailContext)
    const CreateUser= useMutation(api.user.CreateUser)

    // Check if Google Client ID is configured
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          console.log(tokenResponse);
          const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer '+ tokenResponse.access_token } },
          );
      
          console.log(userInfo);
          const user= userInfo.data;
          await CreateUser({
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            uid: uuid4(),
          })
          if(typeof window !== 'undefined'){
            localStorage.setItem('user',JSON.stringify(user))
          }
          setUserDetail(userInfo.data)
          closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
      });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center">{Lookup.SIGNIN_HEADING}</DialogTitle>
                <DialogDescription className="text-center">
                    {Lookup.SIGNIN_SUBHEADING}
                </DialogDescription>
            </DialogHeader>
            
            <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                {googleClientId ? (
                  <Button onClick={() => googleLogin()} className='bg-blue-500 hover:bg-blue-400 w-full'>
                    Sign In with Google
                  </Button>
                ) : (
                  <Button disabled className='bg-gray-500 cursor-not-allowed w-full'>
                    Google OAuth Not Configured
                  </Button>
                )}
                <p className="text-xs text-muted-foreground text-center">
                    {Lookup.SIGNIN_AGREEMENT_TEXT}
                </p>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
