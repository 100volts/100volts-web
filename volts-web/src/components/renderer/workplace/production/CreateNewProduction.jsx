"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import pkg from "../../../../../package.json";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import {
  prodGroup,
  prodElMeterNames,
} from "@/components/datastore/ProductionStore";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const form =
  useForm <
  z.infer <
  typeof formSchema >>
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    };

export default function CreateNewProduction() {
  const form = useForm();
  const dataEl = useStore(prodElMeterNames);
  const dataProdGroup = useStore(prodGroup);
  const $userData = useStore(userData);
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
        production_name: values.prod_name,
        production_description: values.prod_discription,
        units_name: values.prod_unit,
        group_name: values.prod_group,
        el_name: [values.electric_name],
      });
      const response = await fetch(
        `http://${urladdress}/production/company/create`,
        {
          method: "POST",
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
      <Dialog>
        <DialogTrigger>
          <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Create new Production
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creating new production</DialogTitle>
            <DialogDescription>
              Creating a new production intem witch you produce to get how mutch
              energy you spent on a given production.
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
                    <FormLabel>Production description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select production unit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem key="Liter" value="Liter">
                          Liters
                        </SelectItem>
                        <SelectItem key="Kilogram" value="Kilogram">
                          Kilograms
                        </SelectItem>
                        <SelectItem key="Unit" value="Unit">
                          Units
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <a href="/examples/forms">
                        If you are having trobble picking visit the units page
                        for help
                      </a>
                      .
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
