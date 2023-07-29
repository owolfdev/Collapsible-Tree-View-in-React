// "use client";

// import React, { HTMLAttributes, HTMLProps, useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { getColumns } from "./columns";
// import "./index.css";

// import { Filter } from "./filter";

// import {
//   Column,
//   Table,
//   ExpandedState,
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   getExpandedRowModel,
//   ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";
// import { makeData, Person } from "./makeData";
// import { de } from "@faker-js/faker";

// export default function Table() {
//   const rerender = React.useReducer(() => ({}), {})[1];

//   const columns = getColumns();

//   const [data, setData] = useState(() => makeData(20, 5, 3));
//   const refreshData = () => setData(() => makeData(20, 5, 3));

//   const [expanded, setExpanded] = useState<ExpandedState>({});
//   const [expandedRowsLength, setExpandedRowsLength] = useState<number>(0);
//   const [defaultPageSize, setDefaultPageSize] = useState(data.length); // change to your initial page size
//   const [dynamicPageSize, setDynamicPageSize] = useState(data.length);

//   const [pageIndex, setPageIndex] = useState(0); // Add this line
//   const [pageSize, setPageSize] = useState(10); // Add this line

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     // getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     debugTable: true,
//     // manualPagination: true,
//   });

//   useEffect(() => {
//     setExpandedRowsLength(
//       table.getExpandedRowModel().rows.length - data.length
//     );
//   }, [expanded]);

//   useEffect(() => {
//     // console.log("expandedRowsLength: ", expandedRowsLength);
//     setDynamicPageSize(defaultPageSize + expandedRowsLength);
//   }, [expandedRowsLength]);

//   useEffect(() => {
//     console.log("dynamicPageSize: ", dynamicPageSize);
//     console.log("expandedRowsLength: ", expandedRowsLength);
//     console.log("defaultPageSize: ", defaultPageSize);
//     // console.log("pagination row model: ", table.getPaginationRowModel());
//     if (expandedRowsLength + defaultPageSize >= defaultPageSize) {
//       table.setPageSize(dynamicPageSize);
//     } else {
//       table.setPageSize(defaultPageSize);
//     }
//   }, [dynamicPageSize]);

//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                         {header.column.getCanFilter() ? (
//                           <div>
//                             <Filter column={header.column} table={table} />
//                           </div>
//                         ) : null}
//                       </div>
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       {/* <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {"<<"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {"<"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {">"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           {">>"}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             // table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[data.length, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div> */}
//       {/* <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <div>
//         <button onClick={() => refreshData()}>Refresh Data</button>
//       </div>
//       <pre>{JSON.stringify(expanded, null, 2)}</pre> */}
//     </div>
//   );
// }
