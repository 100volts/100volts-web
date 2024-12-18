"use client";

import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  KPIDataStore,
  initLoading,
  KPIGroups,
} from "@/components/datastore/KPIStore";

const formSchema = z.object({
  KPIName: z
    .string()
    .min(2, {
      message: "KPI name must be at least 2 characters.",
    })
    .refine((val) => !/^\d/.test(val), {
      message: "KPI name cannot start with a number.",
    }),
  KPI_target: z.number(),
  description: z.string().min(2, {
    message: "KPI description must be at least 2 characters.",
  }),
});

export default function CreateNewKPI() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      KPIName: "",
      KPI_target: 1,
      description: "",
      KPI_group: "",
    },
  });
  const dataEl = useStore(prodElMeterNames);
  const dataKPIGroup = useStore(KPIGroups); //todo replase dis
  const $userData = useStore(userData);
  const pordData = useStore(productionDashDataStore);

  async function onSubmit(values) {
    const companyName = $userData.companies[0]; //todo remove hard coded call
    const userToken = $userData.tokken;
    const urladdress = pkg["volts-server"];

    try {
      const body = JSON.stringify({
        company: companyName,
        KPIName: values.KPIName,
        description: values.description,
        target: values.KPI_target,
        group: { name: values.KPI_group, description: values.KPI_group },
        energy: {
          index: 1,
          electricEnergyName: values.electric_name,
        },
        settings: {
          name: values.KPI_settings,
        },
        prodNames: values.production_name,
      });
      const response = await fetch(`http://${urladdress}:8081/kpi/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      const datat = await response.json();
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
          <ScrollArea className="h-screen max-h-[600px]">
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmit(form.getValues());
                }}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="KPIName"
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
                  name="description"
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
                  name="KPI_target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KPI target</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value),
                            );
                          }}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="KPI_settings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calculate setting </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select calculation period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="One_day" value="One day">
                            One day
                          </SelectItem>
                          <SelectItem disabled key="One_week" value="One week">
                            One week
                          </SelectItem>
                          <SelectItem
                            disabled
                            key="One_month"
                            value="One month"
                          >
                            One month
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        <a href="/examples/forms">
                          For what period of time will the calculations take
                          plase
                        </a>
                        .
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                                "w-full justify-between",
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
                        <PopoverContent className="w-full p-0">
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
                  name="electric_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Electric energy</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value?.length && "text-muted-foreground",
                              )}
                            >
                              {field.value?.length > 0
                                ? `${field.value.length}  meter${field.value.length > 1 ? "s" : ""} selected`
                                : "Select Electric energy"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search eletric meter..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No meter found.</CommandEmpty>
                              <CommandGroup>
                                {dataEl.map((prod) => {
                                  const isSelected =
                                    field.value?.includes(prod);
                                  return (
                                    <CommandItem
                                      value={prod}
                                      key={prod}
                                      onSelect={() => {
                                        const newValue = isSelected
                                          ? field.value.filter(
                                              (val) => val !== prod,
                                            )
                                          : [...(field.value || []), prod];
                                        form.setValue(
                                          "electric_name",
                                          newValue,
                                        );
                                      }}
                                    >
                                      {prod}
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
                        These are the eletric meteres with are going to be used
                        for calculationg lectric energy for KPI.
                      </FormDescription>
                      <FormMessage />
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
                            <SelectValue placeholder="Select group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataKPIGroup.map((el, index) => (
                            <SelectItem key={index} value={el.name}>
                              {el.name}
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
