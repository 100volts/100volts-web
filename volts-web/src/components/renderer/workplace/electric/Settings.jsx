import pkg from "../../../../../package.json";
import {userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';
import {reportElectricData,selectedElectricMeter} from "@/components/datastore/ElectricStore"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
 
const formSchema = z.object({
  elmeter_name: z.string().min(2, {
    message: "Elctric meter name must be at least 2 characters.",
  }),
  elmeter_address: z.number({
    required_error: "Address is required",
    invalid_type_error: "Address must be a number",
  }),
  elmeter_read_limit: z.string().min(2, {
    message: "Goup name must be at least 2 characters.",
  }),
})


export default function Settings(){
    const $userData=useStore(userData);
    const prod=useStore(selectedElectricMeter);
    const form = useForm();
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
            meter_name:prod.name,
            meter_name_new: values.elmeter_name,
            address_new:values.elmeter_address
            });
            const response = await fetch(
              `http://${urladdress}/elmeter`,
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
          }catch (error) {
        } finally {
            window.location.reload();
        };
      }
    return (
    <><br/>
        <div>
          <h1>Settings for: {prod.name}</h1>
            <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="elmeter_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={prod.name} {...field} />
              </FormControl>
              <FormDescription>
                This is your elctric meter name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="elmeter_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input disabled="true" placeholder={prod.address} {...field} />
              </FormControl>
              <FormDescription>
                This is electric meter modbus address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="elmeter_read_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Read time</FormLabel>
              <FormControl>
                <Input disabled="true" placeholder={prod.readLimit} {...field} />
              </FormControl>
              <FormDescription>
                This is the pouse time between readings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
        </div>
    </>
    )
}