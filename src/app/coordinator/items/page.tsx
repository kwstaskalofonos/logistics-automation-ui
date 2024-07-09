'use client'

import React, { useEffect, useState } from "react";
import LPaging from "@/components/LPaging";
import LTable from "@/components/LTable";
import {useSession } from "next-auth/react";
import { getPage } from "@/services/actions";
import { Item } from "@/services/entities";
import usePaging from "@/(hooks)/usePaging";

const CoordItemsPage: React.FunctionComponent = () => {

    const [data, totalPages, totalElements, page, last, first] = usePaging<Item>("items/dynamic",0,8);

    useEffect(() => {
    },[data])


    return(<React.Fragment>
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
              {data && data.map((v, index) => <tr key={"row-test-" + v.id}>
                <th>{index + 1}</th>
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
            <LPaging totalPages={totalPages} currentPage={page} lastPage={last}/>
          }
        </div>
      </React.Fragment>)
}

export default CoordItemsPage;