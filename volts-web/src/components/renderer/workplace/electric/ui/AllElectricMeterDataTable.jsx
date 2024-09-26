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

export default function AllElectricMeterDataTable({ elmeterProp }) {
  if(elmeterProp.electric_meter_data){
  return (
    <>
      <Table>
        <TableCaption>Electric meter last read data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>L1</TableHead>
            <TableHead>L2</TableHead>
            <TableHead>L3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Voltage:</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.voltagell1}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.voltagell2}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.voltagell3}</TableCell>
            <TableCell>V</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Curent:</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.currentl1}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.currentl2}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.currentl3}</TableCell>
            <TableCell>A</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active Power</TableCell>
            <TableCell>
              {elmeterProp.electric_meter_data.activepowerl1}
            </TableCell>
            <TableCell>
              {elmeterProp.electric_meter_data.activepowerl2}
            </TableCell>
            <TableCell>
              {elmeterProp.electric_meter_data.activepowerl3}
            </TableCell>
            <TableCell>W</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>pfl1</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.pfl1}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.pfl2}</TableCell>
            <TableCell>{elmeterProp.electric_meter_data.pfl3}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Active Power: </TableCell>
            <TableCell>
              {elmeterProp.electric_meter_data.totalActivePpower}
            </TableCell>
            <TableCell>Total Active Energy: </TableCell>
            <TableCell>
              {elmeterProp.electric_meter_data.totalActiveEnergyImportTariff1}
            </TableCell>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  );
}
}
