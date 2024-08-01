'use client'

import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

const Sidebar = () => {

    const router = useRouter();
    const { data: session } = useSession();



    return (
        <React.Fragment>
            <a href="#" className="mt-7">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"/>
            </a>
            <div className="hidden md:block flex flex-col pt-7">
                {(session?.user.companyType == "COORDINATOR") ?
                    <ul>
                        <li onClick={() => router.push("/")}><a>Dashboard</a></li>
                        <li onClick={() => router.push("/coordinator/newOrder")}><a>New Order</a></li>
                        <li onClick={() => router.push("/coordinator/orders")}><a>Orders</a></li>
                        <li onClick={() => router.push("/coordinator/items")}><a>Products</a></li>
                        <li><a>Customers</a></li>
                    </ul> :
                    (session?.user.companyType == "LOGISTICS") ?
                        <ul>
                            <li onClick={() => router.push("/")}><a>Dashboard</a></li>
                            <li onClick={() => router.push("/logistics/orders")}><a>Orders</a></li>
                        </ul> :
                        (session?.user.companyType == "STORAGE") ?
                            <ul>
                                <li onClick={() => router.push("/")}><a>Dashboard</a></li>
                            </ul> :
                            <ul></ul>
                }
            </div>
        </React.Fragment>

    )
}

export default Sidebar;