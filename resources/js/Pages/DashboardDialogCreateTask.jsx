import React from "react";
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

const DashboardDialogCreateTask = () => {
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
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashboardDialogCreateTask;
