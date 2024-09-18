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
import { userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';
import { gasDataPack } from "@/components/datastore/GasStore"
import { useState, useEffect }  from "react";

export default function AddDataTogasMeter() {
  const gasData=useStore(gasDataPack)
    const [meterState,setMeterState]=  useState([{date:"1900-01-01"}]);
    const [meterMinValueState,setMeterMinValueState]=  useState();

    const getMinValue = () => {
      const filteredData = gasData.filter(gas => gas.name === meterState);
      if (filteredData.length === 0) return 1;
      if (!filteredData[0].data) return 1;
      return filteredData[0].data.value;
    };

    const minValue=getMinValue();
    
    const formSchema = z.object({
    gas_name: z.string()   
    .refine((val) => !/^\d/.test(val), {
        message: "gas meter name cannot start with a number.",
    }),
    valueMeter:  z.preprocess((a) => parseInt(z.string().parse(a),10),
    z.number().gte(meterMinValueState+1, {
      required_error: "Value must not be empty.",
      invalid_type_error: "Value must be a number",
    })),

    doe: z.date({
        required_error: "A date of birth is required.",
      }),
  })
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        gas_name: "",
        valueMeter:Number(1),
        doe:""
      },
    })

  const $userData=useStore(userData);

  const handleSubmit = async (event) => {
    event.preventDefault()
    form.handleSubmit(onSubmit)(event);
  };  

  const handleNameChange= async(event)=> {
    form.setValue("gas_name",event)
    setMeterState(event)
  }

  async function onSubmit(values) {
      const companyName = $userData.companies[0];//todo remove hard coded call
      const userToken =$userData.tokken
      const urladdress = pkg["volts-server"];
      try{
        const body = JSON.stringify({
          company_name:companyName,
          gas_meter_name: values.gas_name,
          value:values.valueMeter,
          date:values.doe
        });
        const response = await fetch(
          `http://${urladdress}:8081/gas/data`,
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
    const todayDateOverlapChe = () => {
      return isToday(new Date(getMinDate()));
    };
  
    const getMinDate = () => {
      const filteredData = gasData.filter(gas => gas.name === meterState);
      if (filteredData.length === 0) return new Date("1900-01-01");
      if (!filteredData[0].data) return new Date("1900-01-01");
      return new Date(filteredData[0].data.date+1);
    };
    

    const minDate = getMinDate();
    useEffect(() => {
      setMeterMinValueState(minValue)
      const fieldValue = form.doe
      if (fieldValue && new Date(fieldValue) < getMinDate()) {
        form.setValue('doe', getMinDate()); 
      }
      const dataValue = form.getValues('valueMeter');
      if(dataValue<minValue){
        form.setValue('valueMeter', minValue)
        formSchema.value= z.preprocess((a) => parseInt(z.string().parse(a),10),
        z.number().gte(minValue+1, {
          required_error: "Value must not be empty.123",
          invalid_type_error: "Value must be a number123",
        }))
      }
    }, [minDate, form]);

    return (
    <>
    <Dialog>
    <DialogTrigger>
        <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
                Add gas Data
            </Button>
        </DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Add data to meter</DialogTitle>
      <DialogDescription>
        Add data to meter.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={handleSubmit}  className="space-y-8">
      <FormField 
          control={form.control}
          name="gas_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>gas meter</FormLabel>
              <Select onChange={handleNameChange} onValueChange={handleNameChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select production unit type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {gasData.map((gas, index) => (
                        <SelectItem  key={index} value={gas.name}>{gas.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
              <a href="/examples/forms"></a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valueMeter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input type="number" min={minValue} {...field} />
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
              <FormLabel>Date of read data</FormLabel>
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
                                todayDateOverlapChe()?(format(gasData.filter(gas=> gas.name===meterState)[0].date, "PPP")):
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
                        field.onChange(minDate);
                      } else {
                        field.onChange(date);
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
                Date of gas meter reading.
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


