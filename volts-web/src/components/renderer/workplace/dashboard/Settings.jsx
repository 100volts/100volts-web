import pkg from "../../../../../package.json";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import {
  prodGroup,
  prodElMeterNames,
  productionDashDataStore,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { KPIGroups } from "@/components/datastore/KPIStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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

export default function Settings({ kpi }) {
  const $userData = useStore(userData);
  const dataKPIGroup = useStore(KPIGroups);
  const dataEl = useStore(prodElMeterNames);
  const pordData = useStore(productionDashDataStore);

  console.log("kpi", kpi);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      KPIName: kpi.name,
      KPI_target: kpi.target,
      description: kpi.description,
      KPI_group: kpi.group,
    },
  });

  async function onSubmit(values) {
    const companyName = $userData.companies[0]; //todo remove hard coded call
    const userToken = $userData.tokken;
    const urladdress = pkg["volts-server"];

    try {
      const body = JSON.stringify({
        company: companyName,
        KPIName: kpi.name,
        newName: values.KPIName,
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
      const response = await fetch(`http://${urladdress}:8081/kpi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      const datat = await response.json();
    } catch (error) {
    } finally {
      //window.location.reload();
    }
  }
  return (
    <>
      <br />
      <div>
        <h1>Settings for: {kpi.name}</h1>
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
                        <SelectItem disabled key="One_month" value="One month">
                          One month
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <a href="/examples/forms">
                        For what period of time will the calculations take plase
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
                                const isSelected = field.value?.includes(prod);
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
                                      form.setValue("electric_name", newValue);
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
      </div>
    </>
  );
}
