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

export default function EnergyTable({ data }) {
  console.log("data", data);
  return (
    <>
      <ScrollArea className="m-5 max-h-80 w-full rounded-md border">
        <Table className="w-full">
          <TableCaption>Energy</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {data.electricEnergyName && data.electricEnergyName.length > 0 ? (
              <>
                {data.electricEnergyName.map((energy, index) => (
                  <TableRow key={index}>
                    <TableCell>{energy}</TableCell>
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
          <TableFooter>
            <TableRow>Index: {data.index}</TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </>
  );
}
