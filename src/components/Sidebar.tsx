'use client'

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {

    const router = useRouter();
    const {data: session} = useSession();

    return (
        <aside className="menu">
            {(session?.user.role == "COORDINATOR") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                    <li onClick={()=>router.push("/coordinator/newOrder")}><a>New Order</a></li>
                    <li onClick={()=>router.push("/coordinator/orders")}><a>Orders</a></li>
                    <li><a>Customers</a></li>
                </ul> :
                (session?.user.role == "LOGISTICS") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                    <li onClick={()=>router.push("/logistics/orders")}><a>Orders</a></li>
                </ul> : 
                (session?.user.role == "STORAGE") ?
                <ul className="menu-list">
                    <li onClick={()=>router.push("/")}><a>Dashboard</a></li>
                </ul> :
                <ul className="menu-list"></ul>
            }
        </aside>
    )
}

export default Sidebar;