import React from "react";

interface Props {
    name:string,
    placeholder:string
}

const SearchWrapper: React.FunctionComponent<Props> = ({name,placeholder}) => {

    return(
        <td className="border-b dark:border-slate-700 py-2"><input 
        className="border border-slate-200 rounded text-sm p-1" placeholder={placeholder}/></td>
    )
};

export default SearchWrapper;