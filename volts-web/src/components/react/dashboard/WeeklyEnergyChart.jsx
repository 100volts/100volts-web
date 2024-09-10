"use client";

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

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

export default function Charts({data}) {
    const avrage= Math.round(data.reduce((sum, obj) => sum + obj.energy, 0) / data.length);

  
    return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
            <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                    {data[0].energy}{" "}
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
                  }}
                >
                  <BarChart
                    accessibilityLayer
                    margin={{
                      left: -4,
                      right: -4,
                    }}
                    data={data}
                  >
                    <Bar
                      dataKey="energy"
                      fill="var(--color-steps)"
                      radius={5}
                      fillOpacity={0.6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={4}
                      tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      }}
                    />
                    <ChartTooltip
                      defaultIndex={2}
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
                    <ReferenceLine
                      y={avrage}
                      stroke="hsl(var(--muted-foreground))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    >
                      <Label
                        position="insideBottomLeft"
                        value="Average Steps"
                        offset={10}
                        fill="hsl(var(--foreground))"
                      />
                      <Label
                        position="insideTopLeft"
                        value={avrage}
                        className="text-lg"
                        fill="hsl(var(--foreground))"
                        offset={10}
                        startOffset={100}
                      />
                    </ReferenceLine>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                  Avrage{" "}
                  <span className="font-medium text-foreground">{avrage}</span> kwh.
                </CardDescription>
              </CardFooter>
            </Card>
            </div></div>
      )};
      /*
                      <CardDescription>
                  You need{" "}
                  <span className="font-medium text-foreground">12,584</span> more
                  steps to reach your goal.
                </CardDescription>
      */