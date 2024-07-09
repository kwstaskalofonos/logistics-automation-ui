import React from "react";

interface Props {
    totalPages?:number,
    currentPage?:number,
    lastPage?:boolean
}




const LPaging: React.FunctionComponent<Props> = ({totalPages,currentPage,lastPage}) => {

    const renderButtons = () => {
        if(!totalPages) return [];
        const array:any[]=[];
        for(let i=0; i<totalPages; i++) {
            if(i == currentPage) {
                array.push(<li>
                <a href="#" className="pagination-link is-current">{i+1}</a></li>);
            } else {
                array.push(<li>
                <a href="#" className="pagination-link">{i+1}</a></li>);
            }
        }
        return array;
    }

    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a href="#" className="pagination-previous">Previous</a>
            <a href="#" className="pagination-next">Next page</a>
            <ul className="pagination-list">
               {renderButtons()}
            </ul>
        </nav>)
}

export default LPaging;