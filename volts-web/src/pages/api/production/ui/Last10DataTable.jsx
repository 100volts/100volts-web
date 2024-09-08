import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  export default function Last10DataTable({data}){
    return(
        <Table className="max-w-xs">
            <TableCaption>All data.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead >Value</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data && data.length > 0 ? (
                <>
                {data.map((prodData,index) => (
                <TableRow key={index}>
                    <TableCell >{prodData.values}</TableCell>
                    <TableCell>{prodData.date}</TableCell>
                </TableRow>
                ))}

            </>
            ) : (
                <>
                <TableRow className="text-center"><TableCell>No new reads for today</TableCell></TableRow>
                </>
            )}
            </TableBody>
        </Table>
    )
  }

