'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { data: session, status } = useSession();

    const render = () => {
        const array:any[]=[];
        if(session && session?.user) {
            if(session?.user?.role == 'COORDINATOR') {
                // return children;
                array.push(<React.Fragment>
                    {children}
                </React.Fragment>);
                return array;
            }
            router.push("/");
        }
        
    }

    return (
        render()
    );
}
