'use client'

import React, { useEffect, useState } from "react";
import globalState from "@/store/store";
import CreateProduct from "./modalComponents/CreateProduct";
import CreateCustomer from "./modalComponents/CreateCustomer";
import EditProduct from "./modalComponents/EditProduct";
import EditCustomer from "./modalComponents/EditCustomer";

const Modal: React.FunctionComponent = () => {


    const { modalContentType, setModalContentType } = globalState();

    return (
        <div className={`${modalContentType ? "block" : "hidden"} relative z-10`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen h-screen">
                <div className="flex justify-center pl-[5%] pt-[5%] text-center ">
                    <div className="relative flex flex-col justify-between w-[90%] max-h-[90%] h-auto rounded-lg bg-white text-left shadow-xl">
                        {modalContentType == "createProduct" && <CreateProduct />}
                        {modalContentType == "editProduct" && <EditProduct />}
                        {modalContentType == "createCustomer" && <CreateCustomer/>}
                        {modalContentType == "editCustomer" && <EditCustomer/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;