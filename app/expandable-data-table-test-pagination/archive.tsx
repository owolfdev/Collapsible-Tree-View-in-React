///

// "use client";

// import React, {
//   HTMLAttributes,
//   HTMLProps,
//   useState,
//   useEffect,
//   use,
// } from "react";
// import ReactDOM from "react-dom/client";

// // import { dataForRetail } from "./makeData";

// import "./index.css";

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

// export default function Table() {
//   const rerender = React.useReducer(() => ({}), {})[1];

//   const columns = React.useMemo<ColumnDef<Person>[]>(
//     () => [
//       {
//         header: "Name",
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: "firstName",
//             header: ({ table }) => (
//               <>
//                 <IndeterminateCheckbox
//                   {...{
//                     checked: table.getIsAllRowsSelected(),
//                     indeterminate: table.getIsSomeRowsSelected(),
//                     onChange: table.getToggleAllRowsSelectedHandler(),
//                   }}
//                 />{" "}
//                 <button
//                   {...{
//                     onClick: table.getToggleAllRowsExpandedHandler(),
//                   }}
//                 >
//                   {table.getIsAllRowsExpanded() ? "👇" : "👉"}
//                 </button>{" "}
//                 First Name
//               </>
//             ),
//             cell: ({ row, getValue }) => (
//               <div
//                 style={{
//                   // Since rows are flattened by default,
//                   // we can use the row.depth property
//                   // and paddingLeft to visually indicate the depth
//                   // of the row
//                   paddingLeft: `${row.depth * 2}rem`,
//                 }}
//               >
//                 <>
//                   <IndeterminateCheckbox
//                     {...{
//                       checked: row.getIsSelected(),
//                       indeterminate: row.getIsSomeSelected(),
//                       onChange: row.getToggleSelectedHandler(),
//                     }}
//                   />{" "}
//                   {row.getCanExpand() ? (
//                     <button
//                       {...{
//                         onClick: row.getToggleExpandedHandler(),
//                         style: { cursor: "pointer" },
//                       }}
//                     >
//                       {row.getIsExpanded() ? "👇" : "👉"}
//                     </button>
//                   ) : (
//                     "🔵"
//                   )}{" "}
//                   {getValue()}
//                 </>
//               </div>
//             ),
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorFn: (row) => row.lastName,
//             id: "lastName",
//             cell: (info) => info.getValue(),
//             header: () => <span>Last Name</span>,
//             footer: (props) => props.column.id,
//           },
//         ],
//       },
//       {
//         header: "Info",
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: "age",
//             header: () => "Age",
//             footer: (props) => props.column.id,
//           },
//           {
//             header: "More Info",
//             columns: [
//               {
//                 accessorKey: "visits",
//                 header: () => <span>Visits</span>,
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: "status",
//                 header: "Status",
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: "progress",
//                 header: "Profile Progress",
//                 footer: (props) => props.column.id,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const [data, setData] = useState(() => makeData(100, 5, 3));
//   const refreshData = () =>
//     setData(table.getExpandedRowModel().rows.map((r) => r.original));

//   useEffect(() => {
//     console.log("updated: ", data);
//     // console.log("dataForRetail: ", dataForRetail);
//   }, [data]);

//   const [expanded, setExpanded] = useState<ExpandedState>({
//     // 0: true,
//     // 1: true,
//     // 2: true,
//     // 3: true,
//     // 4: true,
//   });
//   const [expandedRowsLength, setExpandedRowsLength] = useState<number>(0);

//   const [defaultPageSize, setDefaultPageSize] = useState(5); // change to your initial page size

//   const [dynamicPageSize, setDynamicPageSize] = useState(10);

//   useEffect(() => {
//     // setDynamicPageSize(defaultPageSize + (expandedRowsLength - data.length));
//     setDynamicPageSize(5);
//   }, [expandedRowsLength]);

//   useEffect(() => {
//     console.log("dynamicPageSize: ", dynamicPageSize);
//     if (expandedRowsLength > defaultPageSize) {
//       table.setPageSize(dynamicPageSize);
//     } else {
//       table.setPageSize(defaultPageSize);
//     }
//   }, [dynamicPageSize]);

//   // useEffect(() => {
//   //   console.log("expanded: ", expanded);
//   //   console.log("expanded row model", table.getExpandedRowModel());
//   //   let expandedRowsLength = table.getExpandedRowModel().rows.length;

//   //   if (expandedRowsLength > defaultPageSize) {
//   //     table.setPageSize(expandedRowsLength);
//   //   } else {
//   //     table.setPageSize(defaultPageSize);
//   //   }
//   // }, [expanded]);

//   useEffect(() => {
//     console.log("expanded: ", expanded);
//     console.log("expanded row model", table.getExpandedRowModel());
//     setExpandedRowsLength(table.getExpandedRowModel().rows.length);
//   }, [expanded]);

//   useEffect(() => {
//     console.log("expandedRowsLength: ", expandedRowsLength);
//   }, [expandedRowsLength]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     debugTable: true,
//     manualPagination: true,
//   });

//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <table className="">
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
//         <tbody className="">
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
//       <div className="flex items-center gap-2">
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
//               setDynamicPageSize(defaultPageSize);
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[dynamicPageSize].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <div>
//         <button onClick={() => refreshData()}>Refresh Data</button>
//       </div>
//       <pre>{JSON.stringify(expanded, null, 2)}</pre>
//     </div>
//   );
// }

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>;
//   table: Table<any>;
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === "number" ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   );
// }

// function IndeterminateCheckbox({
//   indeterminate,
//   className = "",
//   ...rest
// }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (typeof indeterminate === "boolean") {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate]);

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={className + " cursor-pointer"}
//       {...rest}
//     />
//   );
// }

// const columns = React.useMemo<ColumnDef<Person>[]>(
//   () => [
//     {
//       header: "Name",
//       footer: (props) => props.column.id,
//       columns: [
//         {
//           accessorKey: "firstName",
//           header: ({ table }) => (
//             <>
//               <IndeterminateCheckbox
//                 {...{
//                   checked: table.getIsAllRowsSelected(),
//                   indeterminate: table.getIsSomeRowsSelected(),
//                   onChange: table.getToggleAllRowsSelectedHandler(),
//                 }}
//               />{" "}
//               <button
//                 {...{
//                   onClick: table.getToggleAllRowsExpandedHandler(),
//                 }}
//               >
//                 {table.getIsAllRowsExpanded() ? "👇" : "👉"}
//               </button>{" "}
//               First Name
//             </>
//           ),
//           cell: ({ row, getValue }) => (
//             <div
//               style={{
//                 // Since rows are flattened by default,
//                 // we can use the row.depth property
//                 // and paddingLeft to visually indicate the depth
//                 // of the row
//                 paddingLeft: `${row.depth * 2}rem`,
//               }}
//             >
//               <>
//                 <IndeterminateCheckbox
//                   {...{
//                     checked: row.getIsSelected(),
//                     indeterminate: row.getIsSomeSelected(),
//                     onChange: row.getToggleSelectedHandler(),
//                   }}
//                 />{" "}
//                 {row.getCanExpand() ? (
//                   <button
//                     {...{
//                       onClick: row.getToggleExpandedHandler(),
//                       style: { cursor: "pointer" },
//                     }}
//                   >
//                     {row.getIsExpanded() ? "👇" : "👉"}
//                   </button>
//                 ) : (
//                   "🔵"
//                 )}{" "}
//                 {getValue()}
//               </>
//             </div>
//           ),
//           footer: (props) => props.column.id,
//         },
//         {
//           accessorFn: (row) => row.lastName,
//           id: "lastName",
//           cell: (info) => info.getValue(),
//           header: () => <span>Last Name</span>,
//           footer: (props) => props.column.id,
//         },
//       ],
//     },
//     {
//       header: "Info",
//       footer: (props) => props.column.id,
//       columns: [
//         {
//           accessorKey: "age",
//           header: () => "Age",
//           footer: (props) => props.column.id,
//         },
//         {
//           header: "More Info",
//           columns: [
//             {
//               accessorKey: "visits",
//               header: () => <span>Visits</span>,
//               footer: (props) => props.column.id,
//             },
//             {
//               accessorKey: "status",
//               header: "Status",
//               footer: (props) => props.column.id,
//             },
//             {
//               accessorKey: "progress",
//               header: "Profile Progress",
//               footer: (props) => props.column.id,
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   []
// );

//filtering

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>;
//   table: Table<any>;
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === "number" ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   );
// }

// function IndeterminateCheckbox({
//   indeterminate,
//   className = "",
//   ...rest
// }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (typeof indeterminate === "boolean") {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate]);

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={className + " cursor-pointer"}
//       {...rest}
//     />
//   );
// }

// "use client";

// import Pagination from "./pagination";

// import React, {
//   HTMLAttributes,
//   HTMLProps,
//   useState,
//   useEffect,
//   use,
// } from "react";
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
//   // getPaginationRowModel,
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

//   const [data, setData] = useState(() => makeData(100, 5, 3));
//   const refreshData = () => setData(() => makeData(100, 5, 3));

//   const [expanded, setExpanded] = useState<ExpandedState>({});
//   const [expandedRowsLength, setExpandedRowsLength] = useState<number>(0);
//   const [defaultPageSize, setDefaultPageSize] = useState(5); // change to your initial page size
//   const [dynamicPageSize, setDynamicPageSize] = useState(data.length);

//   const [pageIndex, setPageIndex] = useState(0); // Add this line
//   const [pageSize, setPageSize] = useState(10); // Add this line

//   const [displayedData, setDisplayedData] = useState<Person[]>([]);

//   useEffect(() => {
//     setDisplayedData(
//       data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
//     );
//   }, []);

//   const table = useReactTable({
//     data: displayedData,
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
//       <Pagination
//         data={data}
//         pageLimit={5}
//         dataLimit={10}
//         pageIndex={pageIndex}
//         setPageIndex={setPageIndex}
//         pageSize={pageSize}
//         setPageSize={setPageSize}
//       />
//     </div>
//   );
// }

{
  /* <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            // table.setPageSize(Number(e.target.value));
          }}
        >
          {[data.length, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */
}
{
  /* <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(expanded, null, 2)}</pre> */
}
