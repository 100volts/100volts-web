import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react";
import DisplayProductions from "./DisplayProduction";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductionNav({ cardData }) {
  
  const [dataState, setDataState] = useState();
  async function onSubmit(values) {
    if (cardData) {
      setDataState(
        cardData.filter((datag) => datag.name === values.target.innerText)[0]
      );
    }
  }
  const handleDataChange = async (event) => {
    event.preventDefault();
    form.handleSubmit(onSubmit)(event.target.key);
  };

  useEffect(() => {
    if (cardData) {
      setDataState(cardData[0]);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cardData based on searchQuery
  const filteredData = cardData
    ? cardData.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  return (
    <>
    <ResizablePanelGroup direction="horizontal" > 
  
      <div className="flex h-screen flex-row max-h-[700px] m-1">
      <ResizablePanel defaultSize={20} 
          minSize={15}
          maxSize={35}
      >
        <div className="h-screen max-h-[700px] flex flex-col">
          {cardData ? (
          <>
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
            <Separator className="m-1" />
            <ScrollArea className="h-screen max-h-[700px]">
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <Card key={index} className="m-1" onClick={onSubmit}>
                    <CardHeader>{data.name}</CardHeader>
                    <CardDescription>{/* Add description here if needed */}</CardDescription>
                  </Card>
                ))
              ) : (
                <p className="m-2 text-muted-foreground">No results found</p>
              )}
            </ScrollArea>
          </>
        ) : (
          <p>No data</p>
        )}
        </div>
        </ResizablePanel>
        <ResizableHandle  withHandle/>
        <ResizablePanel defaultSize={80}
                    minSize={15}
                    maxSize={85}

        >
        <div className="flex max-h-[700px]">
          {cardData ? <DisplayProductions production={dataState} /> : <></>}
        </div>
        </ResizablePanel>
      </div>
      </ResizablePanelGroup>
    </>
  );
}
