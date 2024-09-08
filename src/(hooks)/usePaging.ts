'use client'

import { useState, useEffect, useImperativeHandle } from "react";
import { useSession } from "next-auth/react";
import { getPage } from "@/services/actions";
import globalState from "@/store/store";

interface Props {
  url: string,
  pageNumber: number,
  pageSize: number
}

export interface PaginationHandle {
  getPrevPage: () => void;
  getNextPage: () => void;
  fetchData: (filters:any[]) => void;
  getSpecificPage: (selected: number) => void;
}

const usePaging = <T,>(
  { url, pageNumber, pageSize }: Props,
  ref: React.Ref<PaginationHandle>
) => {
  const [data, setData] = useState<T[]>([]);
  const { data: session } = useSession();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(pageNumber);
  const [last, setLast] = useState<boolean>();
  const [first, setFirst] = useState<boolean>();


  useEffect(() => {
    fetchData([]);
  }, [page]);


  const fetchData = async (filters:any[] = []) => {
    // const filters = [
    //   {
    //     fieldName: 'externalCode',
    //     value: '13',
    //   }
    // ];
    

    const result = await getPage(session, url, page, pageSize, filters);
    setData(result.content);
    setTotalPages(result.totalPages);
    setLast(result.last);
    setFirst(result.first);
  };

  useImperativeHandle(ref, () => ({
    fetchData: (filters:any[]) => {
      fetchData(filters);
    },
    getPrevPage: () => {
      setPage(page - 1);
    },
    getNextPage: () => {
      setPage(page + 1);
    },
    getSpecificPage: (selected) => {
      setPage(selected);
    }
  }));

  return [data, totalPages, page, last, first] as const;
};

export default usePaging;