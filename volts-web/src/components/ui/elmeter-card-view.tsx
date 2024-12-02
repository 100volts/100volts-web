"use client"

import React, { useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ElectricMeterGraph from "./prod-electric-meter-display"

interface ElectricMeterProps {
  id: number
  reading: number
  lastUpdated: string
}

const electricMeters123: ElectricMeterProps[] = [
  { id: 1, reading: 45678, lastUpdated: "2023-05-15" },
  { id: 2, reading: 34567, lastUpdated: "2023-05-14" },
  { id: 3, reading: 56789, lastUpdated: "2023-05-13" },
  { id: 4, reading: 23456, lastUpdated: "2023-05-12" },
  { id: 5, reading: 78901, lastUpdated: "2023-05-11" },
  { id: 6, reading: 12345, lastUpdated: "2023-05-10" },
]

/*
old card
<Card className="w-full flex-shrink-0 snap-center">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2">Meter #{id}</h3>
      <p className="text-3xl font-bold mb-2">{reading} kWh</p>
      <ElectricMeterGraph></ElectricMeterGraph>
      <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
    </CardContent>
  </Card>
*/


const ElectricMeterCard: React.FC<ElectricMeterProps> = ({ id, reading, lastUpdated }) => (
  <>

  </>
)

export default function ElectricMeterSlider({electricMeters}:any) {

  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth
      const scrollTo = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount 
        : sliderRef.current.scrollLeft + scrollAmount
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="relative w-full max-w-sm mx-auto px-4">
      
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div 
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div className="flex">
            {electricMeters.map((meter:any) => (
              <div key={meter.id} className="w-full flex-shrink-0">

                      <ElectricMeterGraph chartData={
                        [{ month: "january", read: meter.reading, max: 1260, name:"UHT" }]
                      }></ElectricMeterGraph>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

//                      <p className="text-3xl font-bold mb-2">{meter.reading} kWh</p>