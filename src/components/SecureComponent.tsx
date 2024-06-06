'use client'
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
    children: ReactNode
}

const SecureComponent: React.FunctionComponent<Props> = ({children}) => {

    const { data: session, status } = useSession();
    const router = useRouter();

    return(
        <React.Fragment>
            {(session && session.user) &&
                children 
            }
        </React.Fragment>
    )
}

export default SecureComponent;