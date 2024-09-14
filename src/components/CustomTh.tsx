'use client'
import React from "react";

interface Props {
    children?: React.ReactNode
}

const CustomTh: React.FunctionComponent<Props> = ({ children }) => {

    return (
        <td className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
            {children}
        </td>
    )
};

export default CustomTh;