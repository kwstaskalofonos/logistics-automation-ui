import React from "react";

const LPaging = React.forwardRef(({totalPages,currentPage,lastPage,firstPage}:any, ref:any) => {


    const getClasses = (pageNumber: number) => {
        if (pageNumber === currentPage) {
            return "text-sm rounded-full w-[40px] h-[40px] p-2 border-solid cursor-not-allowed bg-indigo-400 text-white";
        }
        return "text-sm rounded-full w-[40px] h-[40px] p-2 bg-white border-solid border-2 border-indigo-400";
    }

    const renderButtons = () => {
        if (!totalPages) return [];
        const array: any[] = [];

        for (let i = 0; i < totalPages; i++) {

            array.push(
                <button type="button" className={getClasses(i)} onClick={() => ref.current.getSpecificPage(i)}>{i + 1}</button>)
        }

        return array;
    }

    const nextPage = () => {
        if (lastPage) return;
        if(ref && ref.current) {
            ref.current.getNextPage();
        }
    }

    const prevPage = () => {
        if (firstPage) return;
        if(ref && ref.current) {
            ref.current.getPrevPage();
        }
    }

    const btnClass = (button:string) => {
        let cls = "text-sm rounded-md px-4 py-2 bg-white border-solid border-2 border-indigo-400";

        if((button=='prev' && firstPage) || (button=='next' && lastPage)) {
            cls = cls+" cursor-not-allowed opacity-25 "
        }
        return cls;
    }

    return (
        <div className="flex flex-row gap-1 justify-center mt-4">
            <button type="button" className={btnClass('prev')} key={"btn-prev"} onClick={() => prevPage()}>Previous</button>
            <button type="button" className={btnClass('next')} key={"btn-next"} onClick={() => nextPage()}>Next</button>
            {renderButtons()}
        </div>
    )
  });

LPaging.displayName = "LPaging";
export default LPaging;