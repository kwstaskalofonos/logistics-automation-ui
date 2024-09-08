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


const CoordItemsPage: React.FunctionComponent = () => {
  const {modalContentType,setModalContentType,reloadData,setReloadData}=globalState();

  const [filters, setFilters] = useState<any[]>([]);
  const pagingRef = useRef<PaginationHandle>(null);
  const [data, totalPages, page, last, first] = usePaging<Item>({ url: "items/dynamic", pageNumber: 0, pageSize: 5 }, pagingRef);

  useEffect(()=>{
    if(reloadData) {pagingRef.current?.fetchData([]);setReloadData(false)}
  },[reloadData])

  const counter = (index: number) => {
    return index + 1 + (page * 5);
  }


  const actions = () => {
    let array: any[] = [];
    array.push(<span className={"icon"}><FontAwesomeIcon icon={faEdit} /></span>);
    array.push(<span className={"icon ml-1"}><FontAwesomeIcon icon={faTrash} /></span>);
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
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              #</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Title</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              UOM</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Code</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Lot Number</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Quantity</th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
              Actions</th>
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
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{counter(index)}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.title}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.uom}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.externalCode}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.lotNumber}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{v.quantity}</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">{actions()}</td>
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

    {/* {showModal &&
      <GenericModal setShowModal={setShowModal} title={"Create Product"} submit={handleSubmit(onSubmit)} cancel={cancel}>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-2">

          <InputText label="Title" name="title" errors={errors} register={register}/>
          <InputText label="Title" name="uom" errors={errors} register={register}/>
          <InputText label="Title" name="externalCode" errors={errors} register={register}/>
          <InputText label="Title" name="lotNumber" errors={errors} register={register}/>
          <InputText label="quantity" name="quantity" errors={errors} register={register}/>


        </form>
      </GenericModal>
    } */}
  </React.Fragment>)
}

export default CoordItemsPage;