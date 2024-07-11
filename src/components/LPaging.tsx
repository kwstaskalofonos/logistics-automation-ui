import { PaginationHandle } from "@/(hooks)/usePaging";
import React from "react";

interface Props {
    totalPages?:number,
    currentPage:number,
    lastPage?:boolean,
    firstPage?:boolean,
    getNextPage?: any,
    getPrevPage?:any,
    goToPage?:any
}


const LPaging: React.FunctionComponent<Props> = ({
    totalPages,currentPage,lastPage, firstPage, getNextPage, getPrevPage, goToPage}) => {

    const getClasses = (pageNumber:number) => {
        if(pageNumber === currentPage) {
            return "pagination-link is-current";
        }
        return "pagination-link";
    }        

    const renderButtons = () => {
        if(!totalPages) return [];
        const array:any[]=[];

       for(let i=0; i<totalPages; i++) {

            array.push(<li>
                <a key={"btn-paging-"+i} className={getClasses(i)}
                onClick={() => goToPage(i)}>{i+1}</a></li>);
        }
        
        return array;
    }

    const nextPage = () => {
        if(lastPage) return;
        getNextPage();
    }

    const prevPage = () => {
        if(firstPage) return;
        getPrevPage();
    }

    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a key={"btn-prev"} className="pagination-previous" 
            onClick={() => prevPage()}>Previous</a>
            <a key={"btn-next"} className="pagination-next" onClick={() => nextPage()}>Next page</a>
            <ul key={"ul-paging"} className="pagination-list">
               {renderButtons()}
            </ul>
        </nav>)
}

export default LPaging;