"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
//const chartData = [{ month: "january", read: 1260, max: 570 }]

const chartConfig = {
  max: {
    label: "Max",
    color: "hsl(var(--chart-1))",
  },
  read: {
    label: "Read",
    color: "hsl(var(--chart-2))",
  },
}

export default function ElectricMeterGraph({chartData}:any) {
  const totalVisitors = chartData[0].read + chartData[0].max

  return (
    <Card className="w-full flex-shrink-0 snap-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Electric Meter: {chartData[0].name}</CardTitle>
        <CardDescription>{chartData[0].month}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          kWh
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="max"
              fill="var(--color-max)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="read"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-read)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total kwh for {chartData[0].month}
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          last read on: {chartData[0].lastUpdated} <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

/*
add this letter
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
*/
