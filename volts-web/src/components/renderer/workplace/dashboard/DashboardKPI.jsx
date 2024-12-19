import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DisplayKPI from "./DiplayKPI";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { KPIGroups } from "@/components/datastore/KPIStore";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { Filter, Check } from "lucide-react";

export default function DashboardKPI({ cardData }) {
  const [dataState, setDataState] = useState(" ");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const kpiGroups = useStore(KPIGroups);

  //select filtering
  const toggleGroup = (unit) => {
    setSelectedGroups((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit],
    );
  };
  groups;
  const filteredData = cardData
    ? cardData.filter(
        (data) =>
          data.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedGroups.length === 0 ||
            selectedGroups.some(
              (selectedGroup) => data.group === selectedGroup.name,
            )),
      )
    : [];

  //form
  async function onSubmit(values) {
    if (cardData) {
      setDataState(
        cardData.filter((datag) => datag.name === values.target.innerText)[0],
      );
    }
  }

  useEffect(() => {
    let updatedGroups = [];
    if (cardData) {
      setGroups(kpiGroups);
      console.log("selectedGroups", selectedGroups);
    }
    setDataState(cardData[0]);
  }, [cardData]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <div className="m-1 flex max-h-[700px] w-max flex-row">
          <ResizablePanel defaultSize={10} minSize={15} maxSize={95}>
            <div className="flex h-screen max-h-[700px] flex-col">
              {cardData ? (
                <>
                  <Separator />
                  <form className="m-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search"
                        className="pl-8"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          {selectedGroups.length > 0
                            ? `${selectedGroups.length} selected`
                            : "Filter Group"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuLabel>Select Group</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {groups.map((group) => (
                          <DropdownMenuCheckboxItem
                            key={group.name}
                            checked={selectedGroups.includes(group)}
                            onCheckedChange={() => toggleGroup(group)}
                          >
                            {group.name}
                            {selectedGroups.includes(group) && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Separator className="m-1" />
                  <ScrollArea className="h-screen max-h-[700px]">
                    {filteredData.length > 0 ? (
                      filteredData.map((data, index) => (
                        <Card
                          key={index}
                          className={cn(
                            "m-1 cursor-pointer transition-colors",
                            dataState.name === data.name && "bg-muted",
                          )}
                          onClick={onSubmit}
                        >
                          <CardHeader>{data.name}</CardHeader>
                          <CardDescription>
                            {/* Add description here if needed */}
                          </CardDescription>
                        </Card>
                      ))
                    ) : (
                      <p className="m-2 text-muted-foreground">
                        No results found
                      </p>
                    )}
                  </ScrollArea>
                </>
              ) : (
                <>
                  <p>No data</p>
                </>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={90} minSize={15} maxSize={95}>
            <Separator />
            <div className="flex max-h-[700px]">
              {cardData ? <DisplayKPI kpiData={dataState} index={1} /> : <></>}
            </div>
          </ResizablePanel>
          <Separator orientation="horisontal" />
        </div>
      </ResizablePanelGroup>
      <Separator />
    </>
  );
}
