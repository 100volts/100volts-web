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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DisplayKPI from "./DiplayKPI";
import { useStore } from "@nanostores/react";
import { KPIDataStore, initLoading } from "@/components/datastore/KPIStore";
import Loading from "@/components/renderer/workplace/init/InitLoading";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import DashboardKPI from "./DashboardKPI";

export default function Charts() {
  const cardData = useStore(KPIDataStore);
  const progress = useStore(initLoading);

  if (initLoading.get() < 100) {
    return (
      <>
        <h1>KPI</h1>
        <Loading progress={progress} />
      </>
    );
  }
  return (
    <>
      <DashboardKPI cardData={cardData} />
    </>
  );
}
