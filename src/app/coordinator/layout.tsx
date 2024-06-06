'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { data: session, status } = useSession();

    const render = () => {
        if(session && session?.user) {
            if(session?.user?.role == 'COORDINATOR') {
                return children;
            }
            router.push("/");
        }
        
    }

    return (
        render()
    );
}
