"use client";

import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import pkg from "../../../../../package.json";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import {
  prodGroup,
  prodElMeterNames,
  productionDashDataStore,
} from "@/components/datastore/ProductionStore";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const formSchema = z.object({
  KPIName: z
    .string()
    .min(2, {
      message: "KPI name name must be at least 2 characters.",
    })
    .refine((val) => !/^\d/.test(val), {
      message: "Meter name cannot start with a number.",
    }),
  target: z.number().min(2, {
    message: "Target must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Kpi description must be at least 2 characters.",
  }),
});

export default function CreateNewKPI() {
  const form = useForm();
  const dataEl = useStore(prodElMeterNames);
  const dataKPIGroup = useStore(prodGroup); //todo replase dis
  const $userData = useStore(userData);
  const pordData = useStore(productionDashDataStore);
  console.log("productionDashDataStore", pordData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    form.handleSubmit(onSubmit)(event);
  };

  async function onSubmit(values) {
    const companyName = $userData.companies[0]; //todo remove hard coded call
    const userToken = $userData.tokken;
    const urladdress = pkg["volts-server"];
    console.log("values", values);
    /*
    try {
      const body = JSON.stringify({
        company: companyName,
        KPIName: values.KPI_name,
        description: values.KPI_discription,
        target: values.target,
        group: values.group,
        energy: {
          index: values.index,
          electricEnergy: [values.electric_name],
        },
        settings: {
          name: values.setting_name,
        },
        prodNames: [values.prod_names],
      });
      const response = await fetch(`http://${urladdress}:8081/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      const datat = await response.json();
      const { success } = datat;
    } catch (error) {
    } finally {
      window.location.reload();
    }
      */
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Create new KPI
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creating new KPI</DialogTitle>
            <DialogDescription>
              Creating a new Key Performance Indicator (KPI) is essential for
              measuring and tracking the success of specific goals within an
              organization or project.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="production_name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Production</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value?.length && "text-muted-foreground",
                            )}
                          >
                            {field.value?.length > 0
                              ? `${field.value.length} production${field.value.length > 1 ? "s" : ""} selected`
                              : "Select productions"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search production..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No production found.</CommandEmpty>
                            <CommandGroup>
                              {pordData.map((prod) => {
                                const isSelected = field.value?.includes(
                                  prod.name,
                                );
                                return (
                                  <CommandItem
                                    value={prod.name}
                                    key={prod.name}
                                    onSelect={() => {
                                      const newValue = isSelected
                                        ? field.value.filter(
                                            (val) => val !== prod.name,
                                          )
                                        : [...(field.value || []), prod.name];
                                      form.setValue(
                                        "production_name",
                                        newValue,
                                      );
                                    }}
                                  >
                                    {prod.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        isSelected
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      These are the productions that will be used in the KPI.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="KPI_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KPI name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="KPI_discription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KPI description</FormLabel>
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
                name="KPI_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select KPIuction unit type" />
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
                    <FormLabel>KPI Calculation settings</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Electric meter witch connects to the KPIuction" />
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
                name="electric_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KPI Electric Energy</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Electric meter witch connects to the KPIuction" />
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
                name="KPI_group"
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
                        {dataKPIGroup.map((el, index) => (
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
