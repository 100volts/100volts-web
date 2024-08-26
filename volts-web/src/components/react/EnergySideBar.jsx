/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xbgG8uFlzm8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <div className="relative">
      <div
        className={`fixed inset-y-0 left-0 z-10 flex w-[200px] flex-col border-r bg-background transition-all duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="grid gap-4">
            <div className="flex items-center gap-4 rounded-md px-3 py-2 transition-colors hover:bg-muted">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                <CloudLightningIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">Electricity Meter</h3>
                <p className="text-sm text-muted-foreground">Current Usage: 235 kWh</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md px-3 py-2 transition-colors hover:bg-muted">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                <DropletsIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">Water Meter</h3>
                <p className="text-sm text-muted-foreground">Current Usage: 1,250 gallons</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md px-3 py-2 transition-colors hover:bg-muted">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                <FuelIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">Gas Meter</h3>
                <p className="text-sm text-muted-foreground">Current Usage: 125 therms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r bg-background transition-all duration-300 ${
          !isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-center">
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(!isVisible)} className="rounded-full">
            <VolumeXIcon className="w-5 h-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <div className="grid gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              <CloudLightningIcon className="w-5 h-5" />
              <span className="sr-only">Electricity Meter</span>
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              <DropletsIcon className="w-5 h-5" />
              <span className="sr-only">Water Meter</span>
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              <FuelIcon className="w-5 h-5" />
              <span className="sr-only">Gas Meter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CloudLightningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  )
}


function DropletsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  )
}


function FuelIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  )
}


function VolumeXIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}