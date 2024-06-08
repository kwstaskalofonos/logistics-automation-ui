'use client'

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";


const LogisticsOrdersPage: React.FunctionComponent = () => {

    const {data: session} = useSession();

    useEffect(()=>{
        console.log(session);
    },[]);

    return (
        <div className="notification is-primary">
          This is logistics orders page.
      </div>
    );
}

export default LogisticsOrdersPage;