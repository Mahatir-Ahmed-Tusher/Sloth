"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessageContext } from "@/data/context/MessageContext";
import { UserDetailContext } from "@/data/context/UserDetailContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface UserDetail {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

interface Message {
  role: string;
  content: string;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [userDetail, setUserDetail] = React.useState<UserDetail | null>(null);
  const convex = useConvex();

  React.useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user && user.email) {
        const result = await convex.query(api.user.GetUser, {
          email: user.email
        });
        setUserDetail(result as any);
        console.log(result);
      }
    }
  };

  // Check if Google Client ID is configured
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!googleClientId) {
    console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured. Google OAuth will not work.');
    // Return without GoogleOAuthProvider if client ID is missing
    return (
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessageContext.Provider value={{ messages, setMessages }}>
          <NextThemesProvider {...props}>
            {children}
          </NextThemesProvider>
        </MessageContext.Provider>
      </UserDetailContext.Provider>
    );
  }

  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider {...props}>
              {children}
            </NextThemesProvider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </>
  );
}
