'use client'

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import LPaging from "@/components/LPaging";
import LTable from "@/components/LTable";
import { useSession } from "next-auth/react";
import { getPage } from "@/services/actions";
import { Item } from "@/services/entities";
import usePaging, { PaginationHandle } from "@/(hooks)/usePaging";

const CoordItemsPage: React.FunctionComponent = () => {

  const pagingRef = useRef<PaginationHandle>(null);
  const [data, totalPages, page, last, first] = usePaging<Item>({ url: "items/dynamic", pageNumber: 0, pageSize: 5 }, pagingRef);

  const counter = (index: number) => {
    return index + 1 + (page * 5);
  }

  return (<React.Fragment>
    <div className="container is-flex is-justify-content-center">
      <h1 className="title ">Products</h1>
    </div>
    <div className="container-fluid mt-4 p-2">
      <LTable>
        <thead>
          <tr className="is-size-5">
            <th>#</th>
            <th>Title</th>
            <th>UOM</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="is-size-5">
            <th></th>
            <th><input className="input is-small" placeholder="search by Title" /></th>
            <th><input className="input is-small" placeholder="search by uom" /></th>
            <th></th>
          </tr>
          {data && data.map((v, index) => <tr key={"row-test-" + v.id}>
            <th>{counter(index)}</th>
            <th className="has-text-weight-light is-size-6">{v.title}</th>
            <th className="has-text-weight-light is-size-6">{v.uom}</th>
            <th className="has-text-weight-light is-size-6">View</th>
          </tr>)

          }
        </tbody>
      </LTable>
    </div>
    <div className="container-fluid is-flex is-justify-content-center mt-3">
      {(data && data.length > 0) &&
        <LPaging totalPages={totalPages}
          currentPage={page} firstPage={first}
          lastPage={last} getNextPage={pagingRef.current?.getNextPage}
          getPrevPage={pagingRef.current?.getPrevPage}
          goToPage={pagingRef.current?.getSpecificPage} />
      }
    </div>
  </React.Fragment>)
}

export default CoordItemsPage;