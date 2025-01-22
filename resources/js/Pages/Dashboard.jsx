import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardTable from "./DashboardTable";
import DashboardAlert from "./DashboardAlert";
import { useMemo } from "react";
import { format, isBefore } from "date-fns";

export default function Dashboard({ tasks }) {
    // Get today's date (formatted as YYYY-MM-DD for consistency)
    const today = format(new Date(), "yyyy-MM-dd");

    // Find overdue tasks
    const overdueTasks = useMemo(() => {
        return tasks.filter(
            (task) =>
                isBefore(new Date(task.due_date), new Date(today)) &&
                task.status !== "Completed"
        );
    }, [tasks]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Show alert only if there are overdue tasks */}
                    {overdueTasks.length > 0 && (
                        <DashboardAlert overdueTasks={overdueTasks} />
                    )}

                    <DashboardTable tasks={tasks} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
