import LPaging from "@/components/LPaging";
import LTable from "@/components/LTable";
import React, { useState } from "react";


const CoordOrdersPage: React.FunctionComponent = () => {


  const getData = () => {
    const array: any[] = [];
    array.push({
      index: 1234, orderNo: 'Ord123', customer: 'CustomerA',
      orderDate: '2024/5/12', totalCost: 1200.40, status: 'Pending'
    });

    array.push({
      index: 1235, orderNo: 'Ord124', customer: 'CustomerA',
      orderDate: '2024/5/12', totalCost: 1200.40, status: 'Completed'
    });

    array.push({
      index: 1236, orderNo: 'Ord125', customer: 'CustomerA',
      orderDate: '2024/5/12', totalCost: 1200.40, status: 'Pending'
    });

    array.push({
      index: 1237, orderNo: 'Ord126', customer: 'CustomerA',
      orderDate: '2024/5/12', totalCost: 1200.40, status: 'Completed'
    });

    array.push({
      index: 1238, orderNo: 'Ord127', customer: 'CustomerA',
      orderDate: '2024/5/12', totalCost: 1200.40, status: 'Pending'
    });

    return array;

  }

  return (
    <React.Fragment>
      <div className="container is-flex is-justify-content-center">
        <h1 className="title ">Orders</h1>
      </div>
      <div className="container-fluid mt-4 p-2">
        <LTable>
          <thead>
            <tr className="is-size-5">
              <th>#</th>
              <th>Order No</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getData().map((v, index) => <tr key={"row-test-" + v.index}>
              <th>{v.index + 1}</th>
              <th className="has-text-weight-light is-size-6">{v.orderNo}</th>
              <th className="has-text-weight-light is-size-6">{v.customer}</th>
              <th className="has-text-weight-light is-size-6">{v.orderDate}</th>
              <th className="has-text-weight-light is-size-6">{v.totalCost + '\u20ac'} </th>
              <th className="has-text-weight-light is-size-6">{v.status}</th>
              <th className="has-text-weight-light is-size-6">View</th>
            </tr>)

            }
          </tbody>
        </LTable>
      </div>
    </React.Fragment>
  );
}

export default CoordOrdersPage;