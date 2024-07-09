'use client'

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

const Sidebar = () => {

    const router = useRouter();
    const {data: session} = useSession();

    

    return (
        <aside className="menu">
            {(session?.user.companyType == "COORDINATOR") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                    <li onClick={()=>router.push("/coordinator/newOrder")}><a>New Order</a></li>
                    <li onClick={()=>router.push("/coordinator/orders")}><a>Orders</a></li>
                    <li onClick={()=>router.push("/coordinator/items")}><a>Products</a></li>
                    <li><a>Customers</a></li>
                </ul> :
                (session?.user.companyType == "LOGISTICS") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                    <li onClick={()=>router.push("/logistics/orders")}><a>Orders</a></li>
                </ul> : 
                (session?.user.companyType == "STORAGE") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                </ul> :
                <ul className="menu-list"></ul>
            }
        </aside>
    )
}

export default Sidebar;