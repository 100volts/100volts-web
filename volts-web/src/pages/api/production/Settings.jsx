import pkg from "../../../../package.json";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import {selectedProduction} from "@/pages/store/ProductionStore"
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
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  production_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  production_discription: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  production_group: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


export default function Settings(){
    const $userData=useStore(userData);
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken;
    const prod=useStore(selectedProduction);
    console.log("prod",prod)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      function onSubmit(values) {
        console.log(values)
      }

    return (
    <><br/>
        <div>
            <h2>Production: <br/>{prod.name}</h2>
            <div>
                <h3>Groups:</h3>
            {prod.groups.map((group, index) => (
                <p key={index}>{group.name}</p>
            ))}
            </div>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </>
    )
}