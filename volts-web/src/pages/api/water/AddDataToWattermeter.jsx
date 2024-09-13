"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm  } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { format,isToday  } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { cn } from "@/lib/utils"
  import { CalendarIcon } from "@radix-ui/react-icons"
  import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import pkg from "../../../../package.json";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import {waterDataNames,waterDataPack} from "@/pages/store/WaterStore"
import  { useState, useEffect }  from "react";

export default function AddDataToWaterMeter() {
  const waterData=useStore(waterDataPack)
    const [meterState,setMeterState]=  useState([{date:"1900-01-01"}]);
const formSchema = z.object({
    water_name: z.string().min(2, {
      message: "Water meter name must be at least 2 characters.",
    })    
    .refine((val) => !/^\d/.test(val), {
        message: "Water meter name cannot start with a number.",
      }),
      value: z.string().min(1, {
      message: "Value must not be empty.",
    }),
    doe: z.date({
        required_error: "A date of birth is required.",
      }),
  })
  
  
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        water_name: "",
        value:1
      },
    })

  const $userData=useStore(userData);

  const handleSubmit = async (event) => {
    event.preventDefault()
    form.handleSubmit(onSubmit)(event);
  };  

  const handleChange= async(event)=> {
    setMeterState(event.target.value)
    console.log("meterState",meterState)
    console.log("waterData", waterData.filter(water=> water.name===meterState))
  }

  async function onSubmit(values) {
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken
    const urladdress = pkg["volts-server"];
    try{
      const body = JSON.stringify({
        company_name:companyName,
        water_meter_name: values.water_name,
        value:values.value,
      });
      const response = await fetch(
        `http://${urladdress}:8081/water/data`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datat = await response.json();
      const { success } = datat;
    }catch (error) {}
     finally {
        window.location.reload();
    }
    ;
  }
  /*
  const todayDateOverlapChe=()=>{
    const filteredData = waterData.filter(water => water.name === meterState);
    if (filteredData.length === 0) {
      return false;
    }
    if (isToday(waterData.filter(water=> water.name===meterState)[0].date)) {
      return true; // Disable if the date is today
    }
    return false;
  }
    */
    // Helper function to check today's date overlap
    const todayDateOverlapChe = () => {
      const filteredData = waterData.filter(water => water.name === meterState);
      if (filteredData.length === 0) return false;
      return isToday(new Date(filteredData[0].date));
    };
  
    // Helper function to get the minimum date from waterData
    const getMinDate = () => {
      const filteredData = waterData.filter(water => water.name === meterState);
      if (filteredData.length === 0) return new Date("1900-01-01");
      return new Date(filteredData[0].date);
    };
    const minDate = getMinDate(); // Get the current min date

    useEffect(() => {
      // Whenever minDate changes, check if field.value is less than minDate
      const fieldValue = form.getValues('doe');
      if (fieldValue && new Date(fieldValue) < minDate) {
        form.setValue('doe', minDate); // Update field value if it's less than the min date
      }
    }, [minDate, form]); // Dependency on minDate and form to re-run when either changes

  //console.log("waterData222", waterData.filter(water=> water.name===meterState)[0].date)

  return (
    <>
    <Dialog>
    <DialogTrigger>
        <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
                Add Water Data
            </Button>
        </DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Creating new production</DialogTitle>
      <DialogDescription>
        Creating a new production intem witch you produce to get how mutch energy you spent on a given production.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={handleSubmit} onChange={handleChange} className="space-y-8">
      <FormField 
          control={form.control}
          name="water_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select production unit type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {waterData.map((water, index) => (
                        <SelectItem  key={index} value={water.name}>{water.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
              <a href="/examples/forms"></a>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doe"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                    disabled={todayDateOverlapChe()}
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                               // todayDateOverlapChe()?(waterData.filter(getMinDate)):
                                todayDateOverlapChe()?(format(waterData.filter(water=> water.name===meterState)[0].date, "PPP")):
                                  format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      const minDate = getMinDate();
                      if (date < minDate) {
                        // Automatically set the calendar value to the minimum date if the selected date is less than the minimum
                        field.onChange(minDate);
                      } else {
                        field.onChange(date); // Otherwise, set it to the selected date
                      }
                    }}
                    disabled={(date) => {
                      const minDate = getMinDate();
                      return date > new Date() || date < minDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
    </DialogContent>
    </Dialog>
    </>
  )
}


