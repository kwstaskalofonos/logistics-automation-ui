'use client'

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LPaging from "@/components/LPaging";
import { Item } from "@/services/entities";
import usePaging, { PaginationHandle } from "@/(hooks)/usePaging";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import Portlet from "@/components/Portet";
import SearchWrapper from "@/components/SearchWrapper";
import GenericModal from "@/components/GenericModal";
import { post } from "@/services/actions";
import { useSession } from "next-auth/react";

const CoordItemsPage: React.FunctionComponent = () => {

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    uom: yup.string().required('UOM is required'),
    externalCode: yup.string().required('External Code is required'),
    lotNumber: yup.string().required('Lot number is required'),
    quantity: yup.number().required('Quantity is required').min(0.1)
  });

  const [filters, setFilters] = useState<any[]>([]);
  const pagingRef = useRef<PaginationHandle>(null);
  const { data: session } = useSession();
  const [data, totalPages, page, last, first] = usePaging<Item>({ url: "items/dynamic", pageNumber: 0, pageSize: 5 }, pagingRef);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data:any) => {
    await post(session,'items/create',data);
    reset();
    pagingRef.current?.fetchData([]);
    setShowModal(false);
  };

  const cancel = () => {
    reset();
    setShowModal(false);
  }

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
      icon={faPlus} style={{ cursor: "pointer" }} onClick={() => setShowModal(true)} />
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

    {showModal &&
      <GenericModal setShowModal={setShowModal} title={"Create Product"} submit={handleSubmit(onSubmit)} cancel={cancel}>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-2">

          <div className="flex flex-col justify-">
            <label>Title:</label>
            <input className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register('title')} />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col justify-">
            <label>UOM:</label>
            <input className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register('uom')} />
            {errors.uom && <p className="text-red-500">{errors.uom.message}</p>}
          </div>

          <div className="flex flex-col justify-">
            <label>External Code:</label>
            <input className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register('externalCode')} />
            {errors.externalCode && <p className="text-red-500">{errors.externalCode.message}</p>}
          </div>

          <div className="flex flex-col justify-">
            <label>Lot No:</label>
            <input className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register('lotNumber')} />
            {errors.lotNumber && <p className="text-red-500">{errors.lotNumber.message}</p>}
          </div>

          <div className="flex flex-col justify-">
            <label>Quantity:</label>
            <input className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register('quantity')} />
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
          </div>

        </form>
      </GenericModal>
    }
  </React.Fragment>)
}

export default CoordItemsPage;