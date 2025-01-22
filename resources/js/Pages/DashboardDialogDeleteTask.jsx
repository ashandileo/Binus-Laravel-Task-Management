import React from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DashboardDialogDeleteTask = ({ isOpen, onClose, task }) => {
    const { delete: destroy, processing } = useForm();
    const { toast } = useToast();

    const handleDelete = () => {
        destroy(route("tasks.destroy", task.id), {
            onSuccess: () => {
                toast({ description: "Task deleted successfully!" });
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the task.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? "Deleting..." : "Delete Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DashboardDialogDeleteTask;
