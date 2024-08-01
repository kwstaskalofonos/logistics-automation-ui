import { PaginationHandle } from "@/(hooks)/usePaging";
import React from "react";

interface Props {
    totalPages?: number,
    currentPage: number,
    lastPage?: boolean,
    firstPage?: boolean,
    getNextPage?: any,
    getPrevPage?: any,
    goToPage?: any
}


const LPaging: React.FunctionComponent<Props> = ({
    totalPages, currentPage, lastPage, firstPage, getNextPage, getPrevPage, goToPage }) => {

    const getClasses = (pageNumber: number) => {
        if (pageNumber === currentPage) {
            return "pagination-link is-current";
        }
        return "pagination-link";
    }

    const renderButtons = () => {
        if (!totalPages) return [];
        const array: any[] = [];

        for (let i = 0; i < totalPages; i++) {

            array.push(
                    <button type="button" className="text-sm rounded-full w-[40px] h-[40px] p-2 bg-white border-solid border-2 
                    border-indigo-600" onClick={() => goToPage(i)}>{i + 1}</button>)    
        }

        return array;
    }

    const nextPage = () => {
        if (lastPage) return;
        getNextPage();
    }

    const prevPage = () => {
        if (firstPage) return;
        getPrevPage();
    }

    return (
        <div className="flex flex-row gap-1 justify-center mt-4">
            <button type="button" className="text-sm rounded-md px-4 py-2 bg-white border-solid border-2
             border-indigo-600" key={"btn-prev"} onClick={() => prevPage()}>Previous</button>
            <button type="button" className="text-sm rounded-md px-4 py-2 bg-white border-solid border-2 
            border-indigo-600" key={"btn-next"} onClick={() => nextPage()}>Next</button>
            {renderButtons()}
        </div>
    )
}

export default LPaging;