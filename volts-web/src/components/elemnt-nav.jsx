import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayMeter from "@/components/renderer/workplace/electric/ElectricMeter"

export default function ElementNav({ cardData,meterdatatesm }) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
        {cardData ? (
          Object.entries(cardData).map(([key, data], index) => (
            <nav  >
              <Card>
                <CardHeader>{data.name}</CardHeader>
                <CardDescription></CardDescription>
              </Card>
            </nav>
          ))
        ) : (
          <a>No data</a>
        )}
        </div>
        <div className="flex flex-col">
          <DisplayMeter elmeter={meterdatatesm} index={1}/>
        </div>
      </div>
    </>
  );
}
