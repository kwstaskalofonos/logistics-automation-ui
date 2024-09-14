import React from "react";

interface Props {
    children: React.ReactNode,
    paddingTop?:number,
    paddingBottom?:number
}

const Portlet: React.FunctionComponent<Props> = ({children, paddingBottom=4, paddingTop=7}) => {

    return(
        <div className={"bg-gray-100 rounded border "+"pt-"+paddingTop+" pb-"+paddingBottom}>
            {children}
        </div>
    )
};

export default Portlet;