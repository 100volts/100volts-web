import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import DisplayProductions from "./DisplayProduction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Check } from "lucide-react";

export default function ProductionNav({ cardData }) {
  console.log("cardData", cardData);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [dataState, setDataState] = useState(" ");
  async function onSubmit(values) {
    if (cardData) {
      setDataState(
        cardData.filter((datag) => datag.name === values.target.innerText)[0],
      );
    }
  }
  const handleDataChange = async (event) => {
    event.preventDefault();
    form.handleSubmit(onSubmit)(event.target.key);
  };
  console.log("groups", groups);
  useEffect(() => {
    let updatedGroups = [];
    if (cardData) {
      setDataState(cardData[0]);
      cardData.forEach((dataObj) => {
        dataObj.groups.forEach((groupObj) => {
          if (!updatedGroups.some((ggroup) => ggroup.name === groupObj.name)) {
            updatedGroups.push(groupObj);
          }
        });
      });
      setGroups(updatedGroups);
      console.log("selectedGroups", selectedGroups);
    }
  }, [cardData]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  console.log("selectedGroups", selectedGroups);
  // Filter cardData based on searchQuery
  const units = ["Unit", "kilogram", "liter"];
  const filteredData = cardData
    ? cardData.filter(
        (data) =>
          data.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedUnits.length === 0 ||
            selectedUnits.includes(data.units.name)) &&
          (selectedGroups.length === 0 ||
            selectedGroups.some((selectedGroup) =>
              data.groups.some((ggroup) => ggroup.name === selectedGroup.name),
            )),
      )
    : [];
  //&& data.groups.filter(pGroup=>pGroup.name==selectedUnits)
  const toggleUnit = (unit) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit],
    );
  };
  const toggleGroup = (unit) => {
    setSelectedGroups((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit],
    );
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <div className="m-1 flex h-screen max-h-[700px] flex-row">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
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
                          {selectedUnits.length > 0
                            ? `${selectedUnits.length} selected`
                            : "Filter Units"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuLabel>Select Units</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {units.map((unit) => (
                          <DropdownMenuCheckboxItem
                            key={unit}
                            checked={selectedUnits.includes(unit)}
                            onCheckedChange={() => toggleUnit(unit)}
                          >
                            {unit}
                            {selectedUnits.includes(unit) && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                <p>No data</p>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={15} maxSize={85}>
            <div className="max-h-[700px]">
              {cardData ? <DisplayProductions production={dataState} /> : <></>}
            </div>
          </ResizablePanel>
          <Separator orientation="horisontal" />
        </div>
      </ResizablePanelGroup>
      <Separator />
    </>
  );
}
