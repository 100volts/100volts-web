import pkg from "../../../../package.json";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  gas_name: z.string().min(2, {
    message: "gasuction name must be at least 2 characters.",
  }),
  gas_discription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  gasuction_group: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function GasSettings({meter}){
  {console.log("meter",meter)}
  return(
  <Dialog className="flex"> 
  <DialogTrigger>
      <Button variant="outline" onClick={() => handleRedirect(meter)}>
          <a style={{ width: "25px" }}><Settings></Settings></a>
        </Button>
  </DialogTrigger>
  <DialogContent  style={{ width: "50%", maxWidth:"100%" }}>
    <DialogHeader>
      <DialogTitle>   
      gas Settings       
      </DialogTitle>
      <DialogDescription>
        gas Settings
      </DialogDescription>
    </DialogHeader>
    <SettingsForm gas={meter}/>
  </DialogContent>
</Dialog>
  )
}


export function SettingsForm({gas}){
    const $userData=useStore(userData);
    const form = useForm();

      const handleSubmit = async (event) => {
        event.preventDefault()
        form.handleSubmit(onSubmit)(event);
      };
      console.log("gas",gas)
  async function onSubmit(values) {
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken
    const urladdress = pkg["volts-server"];
    try{
      const body = JSON.stringify({
        company_name:companyName,
        gas_name:gas,
        gas_name_new: values.gas_name_new,
        gas_description:values.gas_description,
      });
      const response = await fetch(
        `http://${urladdress}:8081/gas`,
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
    <><br/>
        <div>
          <h1>Settings for: {gas}</h1>
            <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="gas_name_new"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={gas} {...field} />
              </FormControl>
              <FormDescription>
                The new gas meter name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gas_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder={gas.description} {...field} />
              </FormControl>
              <FormDescription>
                The new gas meter description.
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