import React from "react";

interface Props {
    children: React.ReactNode
}

const Portlet: React.FunctionComponent<Props> = ({children}) => {

    return(
        <div className="bg-gray-100 py-7 pb-4 rounded border">
            {children}
        </div>
    )
};

export default Portlet;