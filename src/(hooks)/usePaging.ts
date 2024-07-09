'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getPage } from "@/services/actions";

const usePaging = <T>(url:string,
    pageNumber:number,
    pageSize:number) => {

    const [data,setData] = useState<T[]>([]);
    const {data: session} = useSession();
    const [totalPages,setTotalPages] = useState<number>(0);

    useEffect(() => {
        if(url && session?.accessToken) {
            fetchData(session?.accessToken);
        }
    },[url])

    async function fetchData(token:string){
        const filters=[
                {
                    "fieldName":"title",
                    "value":"title "
                }
          ]
      

      const result = await getPage(url,pageNumber,pageSize,token, filters);
      setData(result.content);
      setTotalPages(result.totalPages);
      console.log(result);
}

    return [data, totalPages] as const;
}

export default usePaging;