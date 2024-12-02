import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Last10DataTable({ data }) {
  const prodSum = data.reduce((sum, prod) => sum + prod.values, 0);
  return (
    <ScrollArea className=" w-full  max-h-80 rounded-md border">
      <Table className="w-full">
        <TableCaption>All entries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data && data.length > 0 ? (
            <>
              {data.map((prodData, index) => (
                <TableRow key={index}>
                  <TableCell>{prodData.date}</TableCell>
                  <TableCell>{prodData.values}</TableCell>
                  
                </TableRow>
              ))}
            </>
          ) : (
            <>
              <TableRow className="text-center">
                <TableCell>No new reads for today</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={0.5}>Total</TableCell>
            <TableCell className="text-left">{prodSum}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScrollArea>
  );
}
