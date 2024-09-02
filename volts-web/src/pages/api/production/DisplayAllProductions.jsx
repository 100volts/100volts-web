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
  DialogTrigger,DialogClose
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React, { useState, useEffect } from "react";
  import pkg from "../../../../package.json";
  
const urladdress = pkg["volts-server"];

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
      //const [error, setError] = useState(null);
        try{

              const body = JSON.stringify({
                company_name: companyName,
                production_name:"test",
                value:values.prod_value
              });

        console.log('Request Body:', body);
              const response = await fetch(
                `http://${urladdress}:8081/production/company/data`,
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
              console.log('API Response:', datat);

              const { success } = datat;
        
              console.log(success);

          }catch (error) {
            console.error('Error submitting form:', error);  // Log the error
        } finally {
            console.log('Form submission process completed');
        }
        ;

          
          
      console.log(values)
    }

    const companyName = localStorage.getItem("company_name");
    const userToken = localStorage.getItem("volts_token");

export default function DisplayAllProductions(){
    const [data, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const form = useForm();
    const getProdData = async () => {
        try {
          const body = JSON.stringify({
            company_name: companyName,
          });
          const response = await fetch(
            `http://${urladdress}:8081/production/company/all`,
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
          const { production } = datat;
    
          setProdData(production);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getProdData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;


      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        await form.handleSubmit(onSubmit)(event);
    };

      return(
        <>
        <div>
        {data.map((production, index) => (
            <div key={index}>
                <Card>
                    <CardHeader>{production.name}</CardHeader>
                    <CardContent>
                        <a>{production.description}</a>
                        <a>Date of creation:{production.dateOfCreation}</a>
                        <a>{production.units.name}</a>
                        <br></br>
                        <a>Groups:</a>
                        {production.groups.map((group, index) => (
                            <div key={index}>
                                <a>Name: {group.name}</a>
                                {group.electricMeters.map((electric, index) => (
                                    <div key={index}>
                                        <a>Electric meter name: {electric.meterName}</a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </CardContent>
                        <Dialog>
                    <DialogTrigger>Add new Production value</DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add new Production value</DialogTitle>
                    <DialogDescription>
                        Adding new record for the given production
                    </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="prod_value"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Production value</FormLabel>
                            <FormControl>
                                <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
                    <DialogClose > Close
                    </DialogClose>
                    </DialogContent>
                    </Dialog>
                </Card>
            </div>
        ))}
        </div>
        </>
      );
}