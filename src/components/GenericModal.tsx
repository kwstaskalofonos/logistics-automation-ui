'use client'

import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode,
    setShowModal: any,
    title: string,
    submit: any,
    cancel: any
}

const GenericModal: React.FunctionComponent<Props> = ({ children, setShowModal, title, submit, cancel }) => {



    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen h-screen">
                <div className="flex justify-center pl-[5%] pt-[5%] text-center ">
                    <div className="relative flex flex-col justify-between w-[90%] max-h-[90%] h-auto rounded-lg bg-white text-left shadow-xl">
                        <div>
                            <div className="w-full bg-gray-100 px-4 py-3 ">
                                <p className="flex flex-wrap content-center text-xl">{title}</p>
                            </div>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                {children}
                            </div>
                        </div>

                        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={submit}>Submit</button>
                            <button type="button" className="mr-1 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                            font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericModal;