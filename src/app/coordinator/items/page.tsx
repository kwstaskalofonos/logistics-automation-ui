'use client'

import React from "react";
import { useRef } from "react";
import LPaging from "@/components/LPaging";
import { Item } from "@/services/entities";
import usePaging, { PaginationHandle } from "@/(hooks)/usePaging";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Portlet from "@/components/Portet";
import SearchWrapper from "@/components/SearchWrapper";

const CoordItemsPage: React.FunctionComponent = () => {

  const pagingRef = useRef<PaginationHandle>(null);
  const [data, totalPages, page, last, first] = usePaging<Item>({ url: "items/dynamic", pageNumber: 0, pageSize: 5 }, pagingRef);

  const counter = (index: number) => {
    return index + 1 + (page * 5);
  }


  const actions = () => {
    let array: any[] = [];
    array.push(<span className={"icon"}><FontAwesomeIcon icon={faEdit} /></span>);
    array.push(<span className={"icon"}><FontAwesomeIcon icon={faTrash} /></span>);
    return array;
  }

  return (<React.Fragment>
    <div className="container">
      <h1>Stock</h1>
    </div>
    <Portlet>
      <table className="table-auto w-full text-md">
        <thead>
          <tr>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              #</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Title</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              UOM</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Code</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          <tr>
            <td></td>
            <SearchWrapper name="title" placeholder="Search by Title"/>
            <SearchWrapper name="uom" placeholder="Search by UOM"/>
            <SearchWrapper name="externalCode" placeholder="Search by External Code"/>
            <td></td>
          </tr>
          {data && data.map((v, index) => <tr key={"row-test-" + v.id}>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{counter(index)}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.title}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.uom}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.externalCode}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{actions()}</td>
          </tr>)

          }
        </tbody>
      </table>
      {(data && data.length > 0) &&
        <LPaging totalPages={totalPages}
          currentPage={page} firstPage={first}
          lastPage={last} getNextPage={pagingRef.current?.getNextPage}
          getPrevPage={pagingRef.current?.getPrevPage}
          goToPage={pagingRef.current?.getSpecificPage} />
      }
    </Portlet>

  </React.Fragment>)
}

export default CoordItemsPage;