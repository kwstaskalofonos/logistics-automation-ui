import React, { useEffect, useState } from "react";

const SearchWrapper = React.forwardRef(({ name, placeholder, filters, setFilters }: any, ref:any) => {

    const [value,setValue] = useState<string>("");


    // useEffect(() => {
    //     if(ref && ref.current) {
    //         let temp = filters;
    //         let idx = filters.findIndex((v: any) => v.fieldName === name);


    //         if(value.length===0 && idx > -1) {
    //             temp.splice(idx,1);
    //             setFilters(temp);
    //             return;
    //         }
    //         if(value.length===0) {
    //             return;
    //         }

    //         let values: any = {
    //             fieldName: name,
    //             value: value
    //         }

    //         if (idx > -1) {
    //             temp.splice(idx, 1, values);
    //         } else {
    //             temp.splice(0, 0, values);
    //         }
    //         console.log(temp);
    //         setFilters(temp);
    //         ref.current.fetchData(temp);
    //     }
    // },[value])

    function debounce(func:any, timeout = 1000){
        let timer:any;
        return (...args: any[]) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(...args); }, timeout);
        };
      }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        // setValue(e.target.value ? e.target.value : "");
    }
    const debouncedOnSearch = debounce(onSearch);
    return (
        <td className="border-b dark:border-slate-700 py-2"><input onChange={debounce(onSearch)}
            className="border border-slate-200 rounded text-sm p-1" placeholder={placeholder} /></td>
    )
});

SearchWrapper.displayName = "SearchWrapper";
export default SearchWrapper;