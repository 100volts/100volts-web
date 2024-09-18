import { useState, useEffect } from "react";
import pkg from "../../../../package.json";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { isLogedIn,userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';
import {reportElectricData} from "@/components/datastore/ElectricStore"

///
const data1 = [
  {
    merterId: 1,
    voltagell1: 237.5,
    voltagell2: 237.63,
    voltagell3: 239.86,
    pfl1: 0.974549,
    currentl1: 33.3096,
    currentl2: 34.079,
    currentl3: 34.5922,
    activepowerl1: 7714.61,
    activepowerl2: 7033.43,
    activepowerl3: 7835.15,
    totalActiveEnergyImportTariff1: 72567.12,
    totalActiveEnergyImportTariff2: 0,
    totalActivePpower: 22583.19,
    pfl2: 0.944497,
    pfl3: 0.985958,
  },
  {
    merterId: 222,
    voltagell1: 237.5,
    voltagell2: 237.63,
    voltagell3: 239.86,
    currentl1: 33.3096,
    currentl2: 34.079,
    currentl3: 34.5922,
    activepowerl1: 7714.61,
    activepowerl2: 7033.43,
    activepowerl3: 7835.15,
    pfl1: 0.974549,
    pfl2: 0.869258,
    pfl3: 0.945079,
    totalActivePpower: 22583.19,
    totalActiveEnergyImportTariff1: 72567.12,
    totalActiveEnergyImportTariff2: 0,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
  {
    merterId: 1,
    voltagell1: "233.80",
    voltagell2: 234.45,
    voltagell3: 235.18,
    currentl1: 6.323,
  },
  {
    merterId: 1,
    voltagell1: "235.69",
    voltagell2: 235.6,
    voltagell3: 236.74,
    currentl1: 7.5014,
  },
];

export const columns1 = [
  {
    accessorKey: "merterId",
    header: "merterId",
  },
  {
    accessorKey: "totalActivePpower",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          totalActivePpower
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalActiveEnergyImportTariff1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          totalActiveEnergyImportTariff1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      );
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
      );
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
      );
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
      );
    },
  },
  {
    accessorKey: "currentl2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          currentl2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "currentl3",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          currentl3
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "activepowerl1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          activepowerl1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "activepowerl2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          activepowerl2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "activepowerl3",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          activepowerl3
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pfl1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          pfl1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pfl2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          pfl2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pfl3",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          pfl3
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "totalActiveEnergyImportTariff2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          totalActiveEnergyImportTariff1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
///
export default function GetReport() {
  const urladdress = pkg["volts-server"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const $userData=useStore(userData);
  const companyName = $userData.companies[0];//todo remove hard coded call
  const userToken =$userData.tokken;
  const elMeterAddress = useStore(reportElectricData);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getElmeterData = async () => {
    try {
      const body = JSON.stringify({
        company_name: companyName,
        address: elMeterAddress,
        page_limit: 100,
        pages: 1,
      });
      const response = await fetch(
        `http://${urladdress}:8081/elmeter/data/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datat = await response.json();
      const { meters } = datat;
      setData(meters);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getElmeterData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div>
        <DataTable columns={columns1} data={data[0]} />
      </div>
    </>
  );
}

function buttClick(row){
}

export function DataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
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
  });

  return (
    <div className="rounded-md border" style={{ width: "77%", maxWidth:"80%"}}>
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter totalActivePpower..."
            value={table.getColumn("totalActivePpower")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("totalActivePpower")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center py-4"></div>
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
          <TableBody style={{ width: "77%", maxWidth:"80%",maxHeight:"50% ", height:"50%" }}>
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
                  <TableCell><Button onClick={buttClick(row)}>butt</Button></TableCell>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <DataTablePagination table={table}></DataTablePagination>
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
  );
}

export function DataTablePagination({ table }) {
  //{table.getFilteredSelectedRowModel().rows.length} of{" "}
  //{table.getFilteredRowModel().rows.length} row(s) selected.
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
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
  );
}
