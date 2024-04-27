'use client'

import { SessionProvider, useSession } from "next-auth/react";

const Sidebar = () => {


    const {data: session} = useSession();

    return (
        <aside className="menu">
            {session ?
                <ul className="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Customers</a></li>
                <li><a>Orders</a></li>
                <li><a>Storages</a></li>
                <li><a>New Order</a></li>
            </ul> :
                <ul className="menu-list">
            </ul>
            }
            
        </aside>
    )
}

export default Sidebar;