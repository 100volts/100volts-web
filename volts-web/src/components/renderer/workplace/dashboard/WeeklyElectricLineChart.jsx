"use client";

import {  Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Charts({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  // Sort the data by date in ascending order
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const average = Math.round(sortedData.reduce((sum, obj) => sum + obj.energy, 0) / sortedData.length);

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card className="lg:max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              {sortedData[sortedData.length - 1].energy}{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                kwh
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={sortedData}
              >
                <Line
                              dataKey="energy"
                              type="linear"
                              stroke="var(--color-desktop)"
                              strokeWidth={2}
                              dot={false}
                />
                            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
                <ChartTooltip
                  defaultIndex={sortedData.length - 1}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Average{" "}
              <span className="font-medium text-foreground">{average}</span> kwh.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}