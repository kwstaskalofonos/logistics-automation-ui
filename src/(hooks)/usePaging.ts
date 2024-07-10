'use client'

import { useState, useEffect, useImperativeHandle } from "react";
import { useSession } from "next-auth/react";
import { getPage } from "@/services/actions";

interface Props {
    url:string,
    pageNumber:number,
    pageSize:number
}

const usePaging = <T,>(
    { url, pageNumber, pageSize }: Props,
    ref: React.Ref<any>
  ) => {
    const [data, setData] = useState<T[]>([]);
    const { data: session } = useSession();
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [page, setPage] = useState<number>();
    const [last, setLast] = useState<boolean>();
    const [first, setFirst] = useState<boolean>();
  
    // useEffect(() => {
    //   if (url && session?.accessToken) {
    //     fetchData(session?.accessToken);
    //   }
    // }, [url, session?.accessToken]);
  
    const fetchData = async (token: string) => {
      const filters = [
        {
          fieldName: 'title',
          value: 'title ',
        },
      ];
  
      const result = await getPage(url, pageNumber, pageSize, token, filters);
      setData(result.content);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
      setPage(result.number);
      setLast(result.last);
      setFirst(result.first);
    };
  
    useImperativeHandle(ref, () => ({
      fetchData: () => {
        if (session?.accessToken) {
          fetchData(session.accessToken);
        }
      },
    }));
  
    return [data, totalPages, totalElements, page, last, first] as const;
  };

export default usePaging;