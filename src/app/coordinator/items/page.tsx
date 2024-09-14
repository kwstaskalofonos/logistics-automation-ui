'use client'

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import LPaging from "@/components/LPaging";
import { Item } from "@/services/entities";
import usePaging, { PaginationHandle } from "@/(hooks)/usePaging";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import Portlet from "@/components/Portet";
import SearchWrapper from "@/components/SearchWrapper";
import globalState from "@/store/store";
import CustomTd from "@/components/CustomTd";
import CustomTh from "@/components/CustomTh";


const CoordItemsPage: React.FunctionComponent = () => {
  const {modalContentType,setModalContentType,reloadData,setReloadData,setItemToEdit}=globalState();

  const [filters, setFilters] = useState<any[]>([]);
  const pagingRef = useRef<PaginationHandle>(null);
  const [data, totalPages, page, last, first] = usePaging<Item>({ url: "items/dynamic", pageNumber: 0, pageSize: 8 }, pagingRef);

  useEffect(()=>{
    if(reloadData) {pagingRef.current?.fetchData([]);setReloadData(false)}
  },[reloadData])

  const counter = (index: number) => {
    return index + 1 + (page * 8);
  }

  const openEditModal = (item:Item) => {
    setItemToEdit(item);
    setModalContentType("editProduct");
  }

  const actions = (item:Item) => {
    let array: any[] = [];
    array.push(<span className={"icon cursor-pointer"}><FontAwesomeIcon icon={faEdit} 
    onClick={() => openEditModal(item)}/></span>);
    array.push(<span className={"icon ml-1 cursor-pointer"}><FontAwesomeIcon icon={faTrash} /></span>);
    return array;
  }

  return (<React.Fragment>
    <div className="container text-center">
      <h1 className="text-2xl">Stock</h1>
    </div>
    <FontAwesomeIcon className="text-sm rounded-full w-[15px] h-[15px] p-1 text-white bg-indigo-400 border-solid border-2 border-indigo-400"
      icon={faPlus} style={{ cursor: "pointer" }} onClick={() => setModalContentType("createProduct")} />
    <Portlet>
      <table className="table-auto w-full text-md">
        <thead>
          <tr>
            <CustomTh>#</CustomTh>
            <CustomTh>Title</CustomTh>
            <CustomTh>UOM</CustomTh>
            <CustomTh>Code</CustomTh>
            <CustomTh>Lot Number</CustomTh>
            <CustomTh>Quantity</CustomTh>
            <CustomTh>Actions</CustomTh>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          <tr>
            <td></td>
            <td><SearchWrapper ref={pagingRef} name="title" placeholder="Search by Title" filters={filters} setFilters={setFilters} /></td>
            <td><SearchWrapper ref={pagingRef} name="uom" placeholder="Search by UOM" filters={filters} setFilters={setFilters} /></td>
            <td><SearchWrapper ref={pagingRef} name="externalCode" placeholder="Search by External Code" filters={filters} setFilters={setFilters} /></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {data && data.map((v, index) => <tr key={"row-test-" + v.id} className="hover:bg-gray-100">
            <CustomTd>{counter(index)}</CustomTd>
            <CustomTd>{v.title}</CustomTd>
            <CustomTd>{v.uom}</CustomTd>
            <CustomTd>{v.externalCode}</CustomTd>
            <CustomTd>{v.lotNumber}</CustomTd>
            <CustomTd>{v.quantity}</CustomTd>
            <CustomTd>{actions(v)}</CustomTd>
          </tr>)

          }
        </tbody>
      </table>
      {(data && data.length > 0) &&
        <LPaging totalPages={totalPages}
          currentPage={page} firstPage={first}
          lastPage={last} ref={pagingRef} />
      }
    </Portlet>
  </React.Fragment>)
}

export default CoordItemsPage;