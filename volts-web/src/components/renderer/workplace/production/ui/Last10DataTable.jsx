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
    <ScrollArea className="h-72 w-full rounded-md border">
      <Table className="w-full">
        <TableCaption>All entries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Value</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data && data.length > 0 ? (
            <>
              {data.map((prodData, index) => (
                <TableRow key={index}>
                  <TableCell className="w-full">{prodData.values}</TableCell>
                  <TableCell className="w-full">{prodData.date}</TableCell>
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
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{prodSum}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScrollArea>
  );
}
