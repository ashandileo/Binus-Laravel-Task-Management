import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
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
import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast";

const DashboardDialogCreateTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        task_name: "",
        progress: 0,
        due_date: new Date(),
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("tasks.store"), {
            data: {
                ...data,
                due_date: format(data.due_date, "yyyy-MM-dd"), // Format date for Laravel
            },
            onSuccess: () => {
                reset();
                toast({
                    description: "Task created successfully!",
                });
                setIsModalOpen(false); // Close modal on success
            },
        });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
                <Button onClick={() => setIsModalOpen(true)}>
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new task
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        {/* Task Name */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task_name" className="text-right">
                                Task Name
                            </Label>
                            <Input
                                id="task_name"
                                type="text"
                                name="task_name"
                                value={data.task_name}
                                onChange={(e) =>
                                    setData("task_name", e.target.value)
                                }
                                className="col-span-3"
                                placeholder="Enter task name"
                            />
                            <InputError
                                message={errors.task_name}
                                className="col-span-3 mt-2"
                            />
                        </div>

                        {/* Task Progress */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="progress" className="text-right">
                                Progress (%)
                            </Label>
                            <Input
                                id="progress"
                                type="number"
                                name="progress"
                                value={data.progress}
                                onChange={(e) =>
                                    setData("progress", e.target.value)
                                }
                                className="col-span-3"
                                min="0"
                                max="100"
                            />
                            <InputError
                                message={errors.progress}
                                className="col-span-3 mt-2"
                            />
                        </div>

                        {/* Due Date Picker */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="due_date" className="text-right">
                                Due Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[342px] pl-3 text-left font-normal",
                                            !data.due_date &&
                                                "text-muted-foreground"
                                        )}
                                    >
                                        {data.due_date ? (
                                            format(data.due_date, "PPP")
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
                                        selected={data.due_date}
                                        onSelect={(date) =>
                                            setData("due_date", date)
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError
                                message={errors.due_date}
                                className="col-span-3 mt-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DashboardDialogCreateTask;
