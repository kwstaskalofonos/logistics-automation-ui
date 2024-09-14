'use client'

import React, { useEffect, useState } from "react";
import Portlet from "@/components/Portet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import CustomTh from "@/components/CustomTh";
import CustomTd from "@/components/CustomTd";
import { Item } from "@/services/entities";
import { title } from "process";
import OrderItemRow from "@/components/businessComponents/OrderItemRow";


const NewOrderPage: React.FunctionComponent = () => {

  const [items, setItems] = useState<Item[]>([{
    title: "test title",
    uom: "uom-123",
    externalCode: "ext-code-123",
    lotNumber: "lot-number-123",
    quantity: 0
  }]);


  const onAddNewItem = () => {
    let temp = [...items];

    temp.push({
      id: 1,
      title: "",
      uom: "",
      externalCode: "",
      lotNumber: "",
      quantity: 0
    });
    console.log(temp);
    setItems(temp);
  }

  const removeItem = (index:number) => {
    let temp = [...items];
    
  }

  const actions = (item:Item, index=0) => {
    let array: any[] = [];
    array.push(<span className={"icon cursor-pointer"} onClick={()=> removeItem(index)}>
      <FontAwesomeIcon className="text-red-500" icon={faMinus}/></span>);
    return array;
  }

  return (
    <>
      <div className="container text-center">
        <h1 className="text-2xl">New Order</h1>
      </div>
      <FontAwesomeIcon className="text-sm rounded-full w-[15px] h-[15px] p-1 text-white bg-indigo-400 border-solid border-2 border-indigo-400"
        icon={faPlus} style={{ cursor: "pointer" }} onClick={onAddNewItem} />

      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Portlet paddingBottom={0}>
            <table className="table-auto w-full text-md">
              <thead>
                <tr>
                  <CustomTh>Title</CustomTh>
                  <CustomTh>UOM</CustomTh>
                  <CustomTh>Code</CustomTh>
                  <CustomTh>Lot Number</CustomTh>
                  <CustomTh>Quantity</CustomTh>
                  <CustomTh/>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                {items && items.map((v, index) => <OrderItemRow 
                index={index} item={v} items={items} setItems={setItems} actions={actions}/>)}
              </tbody>
            </table>
          </Portlet>


        </div>
        <div>

        </div>
      </div>
    </>
  );
}

export default NewOrderPage;