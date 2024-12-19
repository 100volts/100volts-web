import pkg from "../../../../../package.json";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import {
  prodGroup,
  selectedProduction,
  prodElMeterNames,
} from "@/components/datastore/ProductionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prod_name: z.string().min(2, {
    message: "Production name must be at least 2 characters.",
  }),
  prod_discription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  production_group: z.string().min(2, {
    message: "Group name must be at least 2 characters.",
  }),
});

export default function Settings({ kpi }) {
  const $userData = useStore(userData);
  const dataProdGroup = useStore(prodGroup);
  const dataEl = useStore(prodElMeterNames);
  const form = useForm();
  const handleSubmit = async (event) => {
    event.preventDefault();
    form.handleSubmit(onSubmit)(event);
  };
  async function onSubmit(values) {
    const companyName = $userData.companies[0]; //todo remove hard coded call
    const userToken = $userData.tokken;
    const urladdress = pkg["volts-server"];
    try {
      const body = JSON.stringify({
        company_name: companyName,
        production_name: prod.name,
        production_name_new: values.prod_name,
        production_description: values.prod_discription,
        units_name: values.prod_unit,
        group_name: values.prod_group,
        el_name: [values.electric_name],
      });
      const response = await fetch(
        `http://${urladdress}:8081/production/company`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        },
      );
      const datat = await response.json();
      const { success } = datat;
    } catch (error) {
    } finally {
      window.location.reload();
    }
  }
  return (
    <>
      <br />
      <div>
        <h1>Settings for: {kpi.name}</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="prod_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={kpi.name} {...field} />
                  </FormControl>
                  <FormDescription>This is your Kpi name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={kpi.control}
              name="prod_discription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discription</FormLabel>
                  <FormControl>
                    <Input placeholder={kpi.description} {...field} />
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
              name="electric_name"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Electric meter witch connects to the production" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataEl.map((el, index) => (
                        <SelectItem key={index} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prod_group"
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="New group name" {...field} />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Electric group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataProdGroup.map((el, index) => (
                        <SelectItem key={index} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                      <SelectItem key="Crete_new">Crete new</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
