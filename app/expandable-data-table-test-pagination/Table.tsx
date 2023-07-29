"use client";

import Pagination from "./pagination";

import React, {
  HTMLAttributes,
  HTMLProps,
  useState,
  useEffect,
  use,
} from "react";
import ReactDOM from "react-dom/client";
import { useColumns } from "./columns";
import "./index.css";

import { Filter } from "./filter";

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  // getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";
import { de } from "@faker-js/faker";

export default function Table() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = useColumns();

  const [data, setData] = useState(() => makeData(100, 5, 3));
  const refreshData = () => setData(() => makeData(100, 5, 3));

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [expandedRowsLength, setExpandedRowsLength] = useState<number>(0);
  const [defaultPageSize, setDefaultPageSize] = useState(5); // change to your initial page size
  const [dynamicPageSize, setDynamicPageSize] = useState(data.length);

  const [pageIndex, setPageIndex] = useState(0); // Add this line
  const [pageSize, setPageSize] = useState(10); // Add this line

  const [displayedData, setDisplayedData] = useState<Person[]>([]);

  useEffect(() => {
    setDisplayedData(
      data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    );
  }, []);

  const table = useReactTable({
    data: displayedData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
    // manualPagination: true,
  });

  useEffect(() => {
    setExpandedRowsLength(
      table.getExpandedRowModel().rows.length - data.length
    );
  }, [expanded]);

  useEffect(() => {
    // console.log("expandedRowsLength: ", expandedRowsLength);
    setDynamicPageSize(defaultPageSize + expandedRowsLength);
  }, [expandedRowsLength]);

  useEffect(() => {
    console.log("dynamicPageSize: ", dynamicPageSize);
    console.log("expandedRowsLength: ", expandedRowsLength);
    console.log("defaultPageSize: ", defaultPageSize);
    // console.log("pagination row model: ", table.getPaginationRowModel());
    if (expandedRowsLength + defaultPageSize >= defaultPageSize) {
      table.setPageSize(dynamicPageSize);
    } else {
      table.setPageSize(defaultPageSize);
    }
  }, [dynamicPageSize]);

  const handleChangePage = (e: any) => {
    if (e.target.id === "next-page") {
      pageIndex < data.length / pageSize - 1 && setPageIndex(pageIndex + 1);
      console.log("pageIndex: ", data.length / pageSize);
    }
    if (e.target.id === "previous-page") {
      pageIndex > 0 && setPageIndex(pageIndex - 1);
    }
    console.log("pageIndex: ", pageIndex);
  };

  useEffect(() => {
    setDisplayedData(
      data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    );
    setExpanded({});
  }, [pageIndex]);

  useEffect(() => {
    setDisplayedData(
      data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    );
    setExpanded({});
  }, [pageSize]);

  useEffect(() => {
    console.log("displayedData: ", displayedData);
  }, [displayedData]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0);
  };

  return (
    <div className="p-2">
      <div className="h-2" />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex gap-3">
          <button
            className="border rounded px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-50"
            id="first-page"
            onClick={() => setPageIndex(0)}
          >
            {`<<`}
          </button>{" "}
          {/* First page button */}
          <button
            className="border rounded px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-50 disabled:text-gray-200 disabled:bg-gray-100"
            id="previous-page"
            onClick={handleChangePage}
            disabled={pageIndex === 0}
          >
            Previous Page
          </button>
          <button
            className="border rounded px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-50 disabled:text-gray-200 disabled:bg-gray-100"
            id="next-page"
            onClick={handleChangePage}
            disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
          >
            Next Page
          </button>
          <button
            className="border rounded px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-50"
            id="last-page"
            onClick={() => setPageIndex(Math.floor(data.length / pageSize - 1))}
          >
            {`>>`}
          </button>{" "}
          {/* Last page button */}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div>Current Page: {pageIndex + 1}</div>
          <div>
            Page size:
            <select
              className="border rounded px-2"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 30, 40].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {/* Page size input */}
        </div>
      </div>
    </div>
  );
}
