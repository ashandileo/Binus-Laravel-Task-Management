import React from "react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";

const DashboardDialogCreateTask = () => {
    const [field, setField] = React.useState(new Date());

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Create Task</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new task
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Task Name
                        </Label>
                        <Input
                            id="name"
                            value="Ashandi Leonadi"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="progress" className="text-right">
                            Task Progress Percentage
                        </Label>
                        <Input
                            id="progress"
                            value="50"
                            className="col-span-3"
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="due-date" className="text-right">
                            Due Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[342px] pl-3 text-left font-normal",
                                        !field && "text-muted-foreground"
                                    )}
                                >
                                    {field ? (
                                        format(field, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={field}
                                    onSelect={setField}
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashboardDialogCreateTask;
