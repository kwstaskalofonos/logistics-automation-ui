import LPaging from "@/components/LPaging";
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
      </div>
    </React.Fragment>
  );
}

export default CoordOrdersPage;