"use client"
import React, { useState, useEffect } from 'react';
import {  flexRender, 
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,  
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,  
} from "@/components/ui/table"
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
