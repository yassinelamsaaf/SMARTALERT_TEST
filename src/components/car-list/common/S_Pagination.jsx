import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalPages = 50, onPageChange = (pageNum) => { }, nextDisabled = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page") ?? 1));


  const handlePageClick = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
    onPageChange(pageNumber)
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${isActive ? "bg-dark-2 text-white" : ""
      }`;
    return (
      <div key={pageNumber} className="col-auto">
        <button
          disabled={nextDisabled && pageNumber >= currentPage} className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      </div>
    );
  };

  const renderPages = () => {
    const totalPages = 5; // number of clickable pagination buttons
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.max(totalPages, currentPage + 2); i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage),
    );
    return pages;
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button className="button -brown-2 size-40 rounded-full border-light"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage < 2}>
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {currentPage > 3 && (
              <div className="col-auto">
                <div className="size-40 flex-center rounded-full">...</div>
              </div>
            )}
            {renderPages()}
            <div className="col-auto">
              <div className="size-40 flex-center rounded-full">...</div>
            </div>
            <div className="col-auto">
              <div className="size-40 flex-center rounded-full">{totalPages}</div>
            </div>
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>

          {/* <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              1 – 20 
            </div>
          </div> */}
        </div>

        <div className="col-auto md:order-2">
          <button className="button -brown-2 size-40 rounded-full border-light"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={nextDisabled || currentPage >= totalPages}
          >
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
