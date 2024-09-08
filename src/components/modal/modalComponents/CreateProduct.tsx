import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from "../../../services/actions";
import { useSession } from "next-auth/react";
import InputText from "../../formComponents/InputText";
import globalState from "@/store/store";

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    uom: yup.string().required('UOM is required'),
    externalCode: yup.string().required('External Code is required'),
    lotNumber: yup.string().required('Lot number is required'),
    quantity: yup.number().required('Quantity is required').min(0.1)
});

const CreateProduct = () => {

    const { data: session } = useSession();
    const { modalContentType, setModalContentType,setReloadData } = globalState();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: any) => {
        await post(session, 'items/create', data);
        reset();
        //pagingRef.current?.fetchData([]);
        setReloadData(true);
        setModalContentType(null);
    };

    const cancel = () => {
        reset();
        setModalContentType(null);
    }

    return <div>
        <div>
            <div className="w-full bg-gray-100 px-4 py-3 ">
                <p className="flex flex-wrap content-center text-xl">Create Product</p>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <form className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <InputText label="Title" name="title" errors={errors} register={register} />
                    <InputText label="UOM" name="uom" errors={errors} register={register} />
                    <InputText label="External Code" name="externalCode" errors={errors} register={register} />
                    <InputText label="Lot No" name="lotNumber" errors={errors} register={register} />
                    <InputText label="Quantity" name="quantity" errors={errors} register={register} />

                </form>
            </div>
        </div>

        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm 
    ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={handleSubmit(onSubmit)}>Submit</button>
            <button type="button" className="mr-1 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
    font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={cancel}>Cancel</button>
        </div>
    </div>





}
export default CreateProduct