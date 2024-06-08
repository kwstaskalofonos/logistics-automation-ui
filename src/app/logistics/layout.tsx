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
            if(session?.user?.role == 'LOGISTICS') {
                // return children;
                array.push(<div className="columns">
                    <div className="column is-2">
                      <Sidebar/>
                    </div>
                    <div className="column">
                      {children}
                    </div>
                </div>);
                return array;
            }
            router.push("/");
        }
        
    }

    return (
        render()
    );
}
