"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { expandableData } from "./data";

export type Item = {
  id: string;
  name: string;
  parent: string | null | undefined;
  children?: Item[];
};

export function DataTableDemo() {
  const [data, setData] = useState(() => expandableData);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = React.useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Record Store",
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
                Items
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
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: "pointer" },
                      }}
                    >
                      {row.getIsExpanded() ? (
                        <div className="flex gap-2">
                          <ChevronDownIcon />
                          {getValue()}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <ChevronRightIcon />
                          {getValue()}
                        </div>
                      )}{" "}
                    </button>
                  ) : (
                    <div>{getValue()}</div>
                  )}{" "}
                </>
              </div>
            ),
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
