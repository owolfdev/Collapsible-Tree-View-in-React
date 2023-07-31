"use client";

import React, { useState, useEffect } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Link2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { notionData } from "@/data/notion-data2-converted";
import { getProcessedNotionData } from "@/utils/notion-data-utils";
import { ro } from "@faker-js/faker";

export type Item = {
  id: string;
  name: string;
  parent: string;
  subItems: string[];
  priority: string;
  links: string[];
  type: string;
  assignedTo: string[];
  description: string;
  notes: string[];
  tags: string[];
  dueDate?: string;
  filesAndMedia: string[];
  status: string;
  publicUrl: string | null;
  children?: Item[];
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [data, setData] = useState<Item[]>([]);

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pageIndex, setPageIndex] = useState(0); // Add this line
  const [pageSize, setPageSize] = useState(10); // Add this line

  const [expandedRowsLength, setExpandedRowsLength] = useState<number>(0);
  const [defaultPageSize, setDefaultPageSize] = useState(5); // change to your initial page size
  const [dynamicPageSize, setDynamicPageSize] = useState(data.length);

  const [displayedData, setDisplayedData] = useState<Item[]>([]);

  useEffect(() => {
    async function getData() {
      const notionData = await getProcessedNotionData();
      setData(notionData);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log("data: ", data);
    setDisplayedData(
      data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    );
  }, [data, pageIndex, pageSize]);

  function countItemsWithType(data: any, targetType: string) {
    let count = 0;
    for (const item of data) {
      if (item.type === targetType) {
        count++;
      }
    }
    return count;
  }

  const columns = React.useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "name",
            header: ({ table }) => (
              <>
                <button
                  {...{
                    onClick: table.getToggleAllRowsExpandedHandler(),
                  }}
                >
                  {table.getIsAllRowsExpanded() ? (
                    <ChevronDownIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </button>{" "}
                Name
              </>
            ),
            cell: ({ row, getValue }) => (
              <div
                style={{
                  paddingLeft: `${row.depth * 2}rem`,
                }}
              >
                <>
                  {row.getCanExpand() ? (
                    <div className="flex justify-between">
                      <div>
                        <button
                          {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: { cursor: "pointer" },
                          }}
                        >
                          {row.getIsExpanded() ? (
                            <div className="flex gap-2 font-semibold text-lg items-center">
                              <ChevronDownIcon />
                              {getValue()}
                            </div>
                          ) : (
                            <div className="flex gap-2 font-semibold text-lg items-center">
                              <ChevronRightIcon />
                              {getValue()}
                            </div>
                          )}{" "}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {countItemsWithType(row.original.children, "Task") >
                          0 && (
                          <div className="px-3 py-1 bg-blue-400 rounded-full text-white">
                            {countItemsWithType(row.original.children, "Task")}
                          </div>
                        )}
                        {countItemsWithType(row.original.children, "Issue") >
                          0 && (
                          <div className="px-3 py-1 bg-red-400 rounded-full text-white">
                            {countItemsWithType(row.original.children, "Issue")}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`rounded-lg p-5 ${
                        row.original.type === "Task"
                          ? "border-2 border-blue-400"
                          : "border-2 border-red-400"
                      }`}
                    >
                      <div className="text-lg font-semibold mb-2 flex justify-between">
                        <span className="font-semibold">{getValue()}</span>
                        <span
                          className={`${
                            row.original.type === "Task"
                              ? "px-3 py-1 bg-blue-400 rounded-lg text-white"
                              : "px-3 py-1 bg-red-400 rounded-lg text-white"
                          }`}
                        >
                          {row.original.type}
                        </span>{" "}
                      </div>

                      <div>{row.original.description}</div>
                      {/* <div>row: {JSON.stringify(row)}</div> */}
                    </div>
                  )}{" "}
                </>
              </div>
            ),
            footer: (props) => props.column.id,
          },

          ///
          // {
          //   accessorKey: "id",
          //   header: ({ table }) => (
          //     <>
          //       <button
          //         {...{
          //           onClick: table.getToggleAllRowsExpandedHandler(),
          //         }}
          //       >
          //         {table.getIsAllRowsExpanded() ? (
          //           <ChevronDownIcon />
          //         ) : (
          //           <ChevronRightIcon />
          //         )}
          //       </button>{" "}
          //       ID
          //     </>
          //   ),
          //   cell: ({ row, getValue }) => (
          //     <div
          //       style={{
          //         paddingLeft: `${row.depth * 2}rem`,
          //       }}
          //     >
          //       <>
          //         {row.getCanExpand() ? (
          //           <button
          //             {...{
          //               onClick: row.getToggleExpandedHandler(),
          //               style: { cursor: "pointer" },
          //             }}
          //           ></button>
          //         ) : (
          //           <div>
          //             <a
          //               className="flex gap-2 items-center"
          //               href="https://google.com"
          //               target="blank"
          //             >
          //               <Link2Icon /> {row.original.links[0]}
          //             </a>
          //           </div>
          //         )}{" "}
          //       </>
          //     </div>
          //   ),
          //   footer: (props) => props.column.id,
          // },
        ],
      },
      // {
      //   header: "Info",
      //   footer: (props) => props.column.id,
      //   columns: [
      //     {
      //       header: "More Info",
      //       columns: [],
      //     },
      //   ],
      // },
    ],
    []
  );

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
    getSubRows: (row) => row.children,
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
    console.log("expanded: ", expanded);
  }, [expanded]);

  useEffect(() => {
    // console.log("expandedRowsLength: ", expandedRowsLength);
    setDynamicPageSize(defaultPageSize + expandedRowsLength);
  }, [expandedRowsLength]);

  useEffect(() => {
    // console.log("dynamicPageSize: ", dynamicPageSize);
    // console.log("expandedRowsLength: ", expandedRowsLength);
    // console.log("defaultPageSize: ", defaultPageSize);
    // console.log("pagination row model: ", table.getPaginationRowModel());
    if (expandedRowsLength + defaultPageSize >= defaultPageSize) {
      table.setPageSize(dynamicPageSize);
    } else {
      table.setPageSize(defaultPageSize);
    }
  }, [dynamicPageSize]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  {
                    return null;
                  }
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        {/* <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      </div>
    </div>
  );
}
