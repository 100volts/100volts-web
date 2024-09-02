"use client";


import * as React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Zap, Droplet, Flame, Factory } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    icon: Zap,
    label: "Electricity",
    usage: "150 kWh",
    link: "/wokrplace/electricity",
  },
  { icon: Droplet, label: "Water", usage: "2000 L", link: "/" },
  { icon: Flame, label: "Gas", usage: "50 nm³", link: "./" },
  {
    icon: Factory,
    label: "Production",
    usage: "1000 units",
    link: "/wokrplace/production",
  },
];


export default function CollapsibleSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleRedirect = (link) => {
    window.location.href = link;
  };
  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen bg-background transition-all duration-300 ease-in-out ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <Button
          key="butt)open"
          variant="ghost"
          size="icon"
          className="w-full h-20 rounded-none border-b border-border"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronRight
            className={`h-8 w-8 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
        <ScrollArea className="flex-grow">
          <nav className="p-3 space-y-3">
            {sidebarItems.map((item, index) => (
              <Button
              key={index}
                onClick={() => handleRedirect(`${item.link}`)}
                variant="ghost"
                className={`w-full justify-start text-lg ${
                  isExpanded ? "px-5 py-4" : "px-3 py-4"
                }`}
                title={`${item.label}: ${item.usage}`}
              >
                <item.icon className="h-7 w-7 flex-shrink-0" />
                {isExpanded && (
                  <div key={index} className="ml-3 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">
                      Current usage: {item.usage}
                    </div>
                  </div>
                )}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
