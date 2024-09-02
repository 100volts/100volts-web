"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import React, { useState, useEffect } from "react";
import pkg from "../../../../package.json";

const companyName = localStorage.getItem("company_name");
const userToken = localStorage.getItem("volts_token")
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  async function onSubmit(values) {
    try{
      const body = JSON.stringify({
        company_name:companyName,
        production_name: values.prod_name,
        production_description:values.prod_discription,
        units_name:values.prod_unit,
        group_name:"test gtoup",
        el_name:[values.electric_name]
      });
      console.log("body",body)
      const response = await fetch(
        `http://${urladdress}:8081/production/company/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datat = await response.json();
      const { success } = datat;
      console.log(success);
    }catch (error) {
      console.error('Error submitting form:', error);
  } finally {
      console.log('Form submission process completed');
      window.location.reload();
  }
  ;

    console.log(values)
  }


  
const urladdress = pkg["volts-server"];
export default function CreateNewProduction() {
  const form = useForm();
  const [dataEl, setElData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
;
  const getElData = async () => {
    try {
      const body = JSON.stringify({
        company_name: companyName,
      });
      const response = await fetch(
        `http://${urladdress}:8081/elmeter/comapny/names`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datae= await response.json();
      const {elMeterNames}=datae;
      
      setElData(elMeterNames);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => {
    getElData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  const handleSubmit = async (event) => {
    await form.handleSubmit(onSubmit)(event);
};
  return (
    <>
    <Dialog>
    <DialogTrigger>Create new Production</DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Creating new production</DialogTitle>
      <DialogDescription>
        Creating a new production intem witch you produce to get how mutch energy you spent on a given production.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="prod_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prod_discription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production disctription</FormLabel>
              <FormControl>
                <Input placeholder="discription" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prod_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Production group</FormLabel>
              <FormControl>
                <Input placeholder="discription group" {...field} />
              </FormControl>
              <FormDescription>
                Not mandatory. It is used just for organization
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prod_unit"
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
                  <SelectItem value="Liter">Liters</SelectItem>
                  <SelectItem value="Kilogram">Kilograms</SelectItem>
                  <SelectItem value="Unit">Units</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
              <a href="/examples/forms">If you are having trobble picking visit the units page for help</a>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
                                <FormField
                          control={form.control}
                          name="electric_name"
                          render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Electric meter witch connects to the production" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {dataEl.map((el, index) => (
                              <div key={index} >
                                <SelectItem value={el}>{el}</SelectItem>
                              </div>
                            ))}
                            </SelectContent>
                        </Select>)}
                        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </DialogContent>
    </Dialog>
    </>
  )
}
