import React from "react";

interface Props {
    children: React.ReactNode
}

const LTable:React.FunctionComponent<Props> = ({children}) => {

    return(
        <table className="table is-bordered is-hoverable is-fullwidth">
            {children}
        </table>
    )

}

export default LTable;