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

export default function ProductionTable({ data }) {
  const prodSum = data.reduce((sum, prod) => sum + prod.values, 0);
  return (
    <ScrollArea className="m-5 max-h-80 w-full rounded-md border">
      <Table className="w-full">
        <TableCaption>Production</TableCaption>
        <TableHeader>
          <TableRow>
            <h2>Production</h2>
          </TableRow>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Units</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data && data.length > 0 ? (
            <>
              {data.map((prodData, index) => (
                <TableRow key={index}>
                  <TableCell>{prodData.name}</TableCell>
                  <TableCell>{prodData.description}</TableCell>
                  <TableCell>{prodData.units.name}</TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              <TableRow className="text-center">
                <TableCell>No new reads found</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </ScrollArea>
  );
}
