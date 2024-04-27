'use client'

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode
}

const NextAuthProvider: React.FunctionComponent<Props> = ({children}) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default NextAuthProvider;