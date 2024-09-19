"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import pkg from "../../../../../package.json";
import {userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';

 
export default function CreateNewElectricMeter() {
  
const formSchema = z.object({
    electric_name: z.string().min(2, {
      message: "electric meter name must be at least 2 characters.",
    })    
    .refine((val) => !/^\d/.test(val), {
        message: "electric meter name cannot start with a number.",
      }),
    electric_description: z.string().min(2, {
      message: "electric meter description must be at least 2 characters.",
    })
  })

  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        electric_name: "",
        electric_description:""
      },
    })

  const $userData=useStore(userData);
  const handleSubmit = async (event) => {
    event.preventDefault()
    form.handleSubmit(onSubmit)(event);
  };  

  async function onSubmit(values) {
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken
    const urladdress = pkg["volts-server"];
    try{
      const body = JSON.stringify({
        company_name:companyName,
        electric_name: values.electric_name,
        electric_description:values.electric_description,
      });
      const response = await fetch(
        `http://${urladdress}:8081/electric`,
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
  return (
    <>
    <Dialog>
    <DialogTrigger>
        <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
                Create electric Meter
            </Button>
        </DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Creating new electric Meter</DialogTitle>
      <DialogDescription>
        Creating a new electric Meter.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="electric_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Watter meter name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electric_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Watter meter desctription</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
    </DialogContent>
    </Dialog>
    </>
  )
}

