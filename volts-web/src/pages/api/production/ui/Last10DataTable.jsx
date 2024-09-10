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
    const prodSum=data.reduce((sum,prod)=>sum+prod.values,0)
    return(
        <Table className="max-w-xs">
            <TableCaption>All entries.</TableCaption>
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
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{prodSum}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
  }

