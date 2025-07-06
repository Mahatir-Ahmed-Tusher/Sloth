import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
          try {
            console.log(tokenResponse);
            const userInfo = await axios.get(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              { headers: { Authorization: 'Bearer '+ tokenResponse.access_token } },
            );
        
            console.log(userInfo);
            const user = userInfo.data;
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
          } catch (error) {
            console.error('Login error:', error);
          }
        },
        onError: errorResponse => console.log(errorResponse),
      });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
            <DialogHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-lg transform rotate-45"></div>
                    </div>
                </div>
                
                <DialogTitle className="text-2xl font-bold text-foreground">
                    Welcome to Sloth
                </DialogTitle>
                
                <DialogDescription className="text-muted-foreground">
                    To use Sloth you must log into an existing account or create one.
                </DialogDescription>
            </DialogHeader>
            
            <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                {googleClientId ? (
                  <Button 
                    onClick={() => googleLogin()} 
                    className='bg-primary hover:bg-primary/90 text-white w-full'
                  >
                    Continue with Google
                  </Button>
                ) : (
                  <Button 
                    disabled 
                    className='bg-muted text-muted-foreground cursor-not-allowed w-full'
                  >
                    Google OAuth Not Configured
                  </Button>
                )}
                
                <p className="text-xs text-muted-foreground text-center">
                    By using Sloth, you agree to the collection of usage data for analytics.
                </p>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default LoginDialog