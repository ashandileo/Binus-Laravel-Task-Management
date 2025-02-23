import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/Components/ui/input";
import { EllipsisVertical } from "lucide-react";
import DashboardDialogCreateTask from "./DashboardDialogCreateTask";
import DashboardDialogUpdateTask from "./DashboardDialogUpdateTask";
import DashboardDialogDeleteTask from "./DashboardDialogDeleteTask";
import { Progress } from "@/Components/ui/progress";

const DashboardTable = ({ tasks }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter tasks based on search input
    const filteredTasks = tasks.filter((task) =>
        task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Tasks</CardTitle>
                        <CardDescription>
                            All tasks that need to be completed
                        </CardDescription>
                    </div>
                    <DashboardDialogCreateTask />
                </div>
            </CardHeader>
            <CardContent>
                {/* Task Name Filter Input */}
                <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Search by task name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <Table>
                    <TableCaption>.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task Name</TableHead>
                            <TableHead>Phase</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTasks?.length > 0 ? (
                            filteredTasks?.map((task) => (
                                <TaskRow key={task.id} task={task} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan="5"
                                    className="text-center py-4"
                                >
                                    No tasks found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const TaskRow = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">{task?.task_name}</TableCell>
                <TableCell>{task?.status}</TableCell>
                <TableCell>
                    {task?.status === "In Progress" &&
                    task?.due_date &&
                    new Date(task?.due_date) < new Date()
                        ? "Overdue"
                        : "Ontrack"}
                    {/* Overdue */}
                </TableCell>
                <TableCell>
                    <div className="flex flex-col gap-2">
                        <Progress value={task?.progress} />
                        {task?.progress}%
                    </div>
                </TableCell>
                <TableCell>{task?.due_date}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Task Action</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setIsModalOpen(true)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <DashboardDialogUpdateTask
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                task={task}
            />

            <DashboardDialogDeleteTask
                isOpen={isDeleteModalOpen}
                onClose={setIsDeleteModalOpen}
                task={task}
            />
        </>
    );
};

export default DashboardTable;
