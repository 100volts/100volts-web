"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  LabelList,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const chartData = [
  { month: "This month",label: "This month", energy: 200, fill: "var(--color-safari)" },
  { month: "lathMonth", energy: 400, fill: "var(--color-lathMonth)" },
]

const chartConfig = {
  DECEMBER: {
    month: "DECEMBER",
    color: "hsl(var(--chart-2))",
  }, 
  NOVEMBER: {
    month: "NOVEMBER",
    color: "hsl(var(--chart-3))",
  },
}

export default function MonthlyPowerChart({ elmeterProp }:any) {
    const lasthMoth=400;
   
    if(elmeterProp.energyMonthPairDTOS ){
      elmeterProp.energyMonthPairDTOS.forEach((obj:any)=>{
          if(obj.month==="DECEMBER"){
            obj.fill="hsl(var(--chart-2))"
          }
          if(obj.month==="NOVEMBER"){
            obj.fill="hsl(var(--chart-3))"
          }
      });
       console.log("energy",elmeterProp.energyMonthPairDTOS.energy)
    console.log(elmeterProp.energyMonthPairDTOS)
  return (
    <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Monthly Energy</CardTitle>
      <CardDescription>October - November 2024</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          data={elmeterProp.energyMonthPairDTOS}
          startAngle={-90}
          endAngle={360}
          innerRadius={80}
          outerRadius={130}
        >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="month" />}
          />
          <RadialBar dataKey="energy" background cornerRadius={10} >
            <LabelList
              position="insideStart"
              dataKey="month"
              className="fill-white capitalize mix-blend-luminosity"
              fontSize={11}
            />
          </RadialBar>
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {elmeterProp.energyMonthPairDTOS[0].energy}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          kWh November
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total power for the last month <br/> compered to last month
        </div>
      </CardFooter>
  </Card>
  )
}
}
/* Add dis later
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
*/
