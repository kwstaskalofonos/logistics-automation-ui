'use client'

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { getAll } from "@/services/actions";
import globalState from "@/store/store";
import { Customer } from "@/services/entities";

const CustomerBox = ({ customer,openEditModal }: any) => {
    return <div className="rounded p-[10px] bg-indigo-200 transition-all duration-200 cursor-pointer
     hover:bg-indigo-100 hover:shadow-xl flex flex-col gap-[5px]" onClick={()=>openEditModal(customer)}>
        <div>{customer.title}</div>
        <div>Address: {customer.address}</div>
        <div>Tel: {customer.phone}</div>
    </div>
}
const CoordCustomersPage: React.FunctionComponent = () => {
    const { data: session } = useSession();
    const [customers, setCustomers] = useState([]);
    const { modalContentType, setModalContentType, reloadData, setReloadData, setCustomerToEdit } = globalState();

    const openEditModal = (customer: Customer) => {
        setCustomerToEdit(customer);
        setModalContentType("editCustomer");
    }

    useEffect(() => {
        getAll(session, 'customers/all')
            .then(data => setCustomers(data));
    }, [])

    useEffect(() => {
        if (reloadData) {
            getAll(session, 'customers/all')
                .then(data => setCustomers(data));
            setReloadData(false)
        }
    }, [reloadData])

    return (
        <>
            <div className="container text-center">
                <h1 className="text-2xl">Customers</h1>
            </div>
            <FontAwesomeIcon className="text-sm rounded-full w-[15px] h-[15px] p-1 text-white bg-indigo-400 border-solid border-2 border-indigo-400"
                icon={faPlus} style={{ cursor: "pointer" }} onClick={() => setModalContentType("createCustomer")} />
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-[10px]">
                {customers.length > 0 && customers.map((customer: any) => <CustomerBox key={customer.id} customer={customer} openEditModal={openEditModal}/>)}
            </div>

        </>
    );
};

export default CoordCustomersPage;