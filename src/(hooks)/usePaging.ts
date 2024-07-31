'use client'

import { useState, useEffect, useImperativeHandle } from "react";
import { useSession } from "next-auth/react";
import { getPage } from "@/services/actions";

interface Props {
  url: string,
  pageNumber: number,
  pageSize: number
}

export interface PaginationHandle {
  getPrevPage: () => void;
  getNextPage: () => void;
  fetchData: () => void;
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
    fetchData();
  }, [page])


  const fetchData = async () => {
    const filters = [
      {
        fieldName: 'externalCode',
        value: '13',
      }
    ];
    

    //@ts-ignore
    const result = await getPage(session, url, page, pageSize, []);
    setData(result.content);
    setTotalPages(result.totalPages);
    setLast(result.last);
    setFirst(result.first);
  };

  useImperativeHandle(ref, () => ({
    fetchData: () => {
      fetchData();
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