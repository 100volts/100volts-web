import pkg from "../../../../package.json";
import {userData } from "@/components/datastore/UserStore";
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
  water_name: z.string().min(2, {
    message: "wateruction name must be at least 2 characters.",
  }),
  water_discription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  wateruction_group: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function WaterSettings({meter}){
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
      Water Settings       
      </DialogTitle>
      <DialogDescription>
        Water Settings
      </DialogDescription>
    </DialogHeader>
    <SettingsForm water={meter}/>
  </DialogContent>
</Dialog>
  )
}


export function SettingsForm({water}){
    const $userData=useStore(userData);
    const form = useForm();

      const handleSubmit = async (event) => {
        event.preventDefault()
        form.handleSubmit(onSubmit)(event);
      };
      console.log("water",water)
  async function onSubmit(values) {
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken
    const urladdress = pkg["volts-server"];
    try{
      const body = JSON.stringify({
        company_name:companyName,
        water_name:water,
        water_name_new: values.water_name_new,
        water_description:values.water_description,
      });
      const response = await fetch(
        `http://${urladdress}:8081/water`,
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
          <h1>Settings for: {water}</h1>
            <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="water_name_new"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={water} {...field} />
              </FormControl>
              <FormDescription>
                The new water meter name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="water_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder={water.description} {...field} />
              </FormControl>
              <FormDescription>
                The new water meter description.
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