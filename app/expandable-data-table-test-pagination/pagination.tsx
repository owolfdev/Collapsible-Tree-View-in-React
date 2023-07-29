"use client";

import React from "react";

type PaginationProps = {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalDataSize: number; // total number of items in your data
};

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  totalDataSize,
}) => {
  const totalPageCount = Math.ceil(totalDataSize / pageSize); // calculate total number of pages

  const handlePageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPageIndex(parseInt(event.target.value as string, 10));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPageSize(parseInt(event.target.value as string, 10));
  };

  const handleChangePage = () => {
    setPageIndex(pageIndex + 1);
    console.log("pageIndex: ", pageIndex);
  };

  return (
    <div>
      {/* <label>
        Page:
        <select value={pageIndex} onChange={handlePageChange}>
          {Array.from(Array(totalPageCount).keys()).map((num) => (
            <option key={num} value={num}>
              {num + 1}
            </option>
          ))}
        </select>
      </label> */}

      <button onClick={handleChangePage}>Next Page</button>

      <label>
        Items per page:
        <select value={pageSize} onChange={handlePageSizeChange}>
          {[5, 10, 15, 20, 25, 30].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Pagination;
