"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

export const EventUrl = ({ eventId }) => {
  const [tooltipText, setTooltipText] = useState("Copy");
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/events/${eventId}`)
      .then(() => {
        setTooltipText("Copied!");
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, 2000);
      })
      .catch(() => {
        setTooltipText("Failed to copy!");
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, 1000);
      });
  };

  return (
    <div className="w-full">
      <Label>Event URL</Label>
      <div className="flex gap-1">
        <Input
          value={`http://localhost:3000/events/${eventId}`}
          className="text-sm w-full"
          disabled={true}
        />
        <TooltipProvider>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger
              asChild
              onMouseEnter={() => {
                setTooltipText("Copy");
                setTooltipOpen(true);
              }}
            >
              <Button variant="outline" onClick={handleCopy}>
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
