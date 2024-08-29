"use client"
import React, { useState, useEffect } from 'react';
import {  flexRender, 
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,  
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,  
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const data= [
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    },
    {
        merterId: 1,
        voltagell1: "233.80",
        voltagell2: 234.45,
        voltagell3: 235.18,
        currentl1: 6.3230,

    },
    {
        merterId: 1,
        voltagell1: "235.69",
        voltagell2: 235.60,
        voltagell3: 236.74,
        currentl1: 7.5014,
       
    }
]

export const columns= [
    {
      accessorKey: "merterId",
      header: "merterId",
    },
    {
      accessorKey: "voltagell1",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            voltagell1
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "voltagell2",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            voltagell2
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
        accessorKey: "voltagell3",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                voltagell3
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "currentl1",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                currentl1
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
  ]

  export default function CompleteTable(){
    return(
        <>
        <DataTable columns={columns} data={data}></DataTable>
        </>
    )
  }

export function DataTable({
  columns,
  data,
}) {
    const [columnFilters, setColumnFilters] = useState([])
    const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="rounded-md border">
        <div>
        <div className="flex items-center py-4">
        <Input
          placeholder="Filter voltagell1..."
          value={(table.getColumn("voltagell1")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("voltagell1")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center py-4">
      <DataTablePagination  table={table}></DataTablePagination>
      </div>
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
                )
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
    </div>
  )
}


export function DataTablePagination({
    table,
  }) {
    //{table.getFilteredSelectedRowModel().rows.length} of{" "}
    //{table.getFilteredRowModel().rows.length} row(s) selected.
    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          
          
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }