import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from "../../../services/actions";
import { useSession } from "next-auth/react";
import InputText from "../../formComponents/InputText";
import globalState from "@/store/store";

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
});

const EditCustomer = () => {

    const { data: session } = useSession();
    const { modalContentType, setModalContentType,setReloadData } = globalState();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: any) => {
        await post(session, 'customers/create', data);
        reset();
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
                <p className="flex flex-wrap content-center text-xl">Edit Customer</p>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <form className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <InputText label="Title" name="title" errors={errors} register={register} />
                    <InputText label="Address" name="address" errors={errors} register={register} />
                    <InputText label="Tel" name="phone" errors={errors} register={register} />

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
export default EditCustomer;