'use client'
import React from "react";
import CustomTd from "../CustomTd";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const inputStyle = "p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1";

const OrderItemRow = ({ index, item, items, setItems,actions }: any) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    return (
        <tr key={"row-test-" + index+1} className="hover:bg-gray-100">
            <CustomTd>
                <input defaultValue={item.title} {...register("title")}
                className={inputStyle}/>
            </CustomTd>
            <CustomTd>
                <input defaultValue={item.uom} {...register("uom")}
                className={inputStyle}/>
            </CustomTd>
            <CustomTd>
                <input defaultValue={item.externalCode} {...register("externalCode")}
                className={inputStyle}/>
            </CustomTd>
            <CustomTd>
                <input defaultValue={item.lotNumber} {...register("lotNumber")}
                className={inputStyle}/>
            </CustomTd>
            <CustomTd>
                <input defaultValue={item.quantity} {...register("quantity")}
                className={inputStyle}/>
            </CustomTd>
            <CustomTd>{actions()}</CustomTd>
        </tr>
    );
};

export default OrderItemRow;