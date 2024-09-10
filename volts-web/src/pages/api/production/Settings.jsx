import pkg from "../../../../package.json";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import { prodGroup,selectedProduction} from "@/pages/store/ProductionStore"
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
  production_name: z.string().min(2, {
    message: "Production name must be at least 2 characters.",
  }),
  production_discription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  production_group: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


export default function Settings(){
    const $userData=useStore(userData);
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken;
    const dataProdGroup=useStore(prodGroup);

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
          name="production_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={prod.name} {...field} />
              </FormControl>
              <FormDescription>
                This is your product name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="production_discription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discription</FormLabel>
              <FormControl>
                <Input placeholder={prod.description} {...field} />
              </FormControl>
              <FormDescription>
                This is product discription.
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
                  <SelectItem key="Liter" value="Liter">Liters</SelectItem>
                  <SelectItem key="Kilogram" value="Kilogram">Kilograms</SelectItem>
                  <SelectItem key="Unit" value="Unit">Units</SelectItem>
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
                          name="prod_group"
                          render={({ field }) => (<FormItem>
                            <Input placeholder="New group name" {...field} />
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Electric group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {dataProdGroup.map((el, index) => (
                                <SelectItem  key={index} value={el}>{el}</SelectItem>
                            ))}
                            <SelectItem key="Crete_new">Crete new</SelectItem>
                            </SelectContent>
                        </Select></FormItem>)}
         />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </>
    )
}