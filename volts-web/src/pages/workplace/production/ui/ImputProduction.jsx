import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,DialogClose
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
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import pkg from "../../../../../package.json";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
})

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
})


export default function ImputProduction({production}){
    const form = useForm({
        defaultValues: {
          prod_value: '',
          prod_name: '' 
        }
    });
    const $userData=useStore(userData);
    async function onSubmit(values) {
      const urladdress = pkg["volts-server"];
      const companyName = $userData.companies[0];//todo remove hard coded call
      const userToken =$userData.tokken
        try{
              const body = JSON.stringify({
                company_name: companyName,
                production_name:values.prod_name,
                value:values.prod_value,
                date:values.date.toISOString()
              });
              const response = await fetch(
                `http://${urladdress}:8081/production/company/data`,
                {
                  method: "POST",
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
        }
        ;
    
    }
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await form.handleSubmit(onSubmit)(event);
    };

    return(
        <>
        <Card>
            <CardHeader>Input productiuon</CardHeader>
            <CardContent>
            <Dialog>
                    <DialogTrigger>Add new Production value</DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add new Production value</DialogTitle>
                    <DialogDescription>
                        Adding new record for the given production
                    </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="prod_value"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Production value</FormLabel>
                            <FormControl>
                                <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of prodction</FormLabel>
                            <Popover >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      " pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                        <FormField
                          control={form.control}
                          name="prod_name"
                          render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select production unit type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {production.map((prod, index) => (
                              <div key={index} >
                                <SelectItem value={prod.name}>{prod.name}</SelectItem>
                              </div>
                            ))}
                            </SelectContent>
                        </Select>)}
                        />
                        <Button type="submit">Add</Button>
                    </form>
                    </Form>
                    <DialogClose > Close
                    </DialogClose>
                    </DialogContent>
            </Dialog>
            </CardContent>
          </Card>
          </>
    )
}