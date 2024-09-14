'use client'
import React from "react";

interface Props {
    children: React.ReactNode
}

const CustomTd: React.FunctionComponent<Props> = ({ children }) => {

    return (
        <td className="border-b dark:border-slate-700 p-4 pl-8 text-gray-600">
            {children}
        </td>
    )
};

export default CustomTd;