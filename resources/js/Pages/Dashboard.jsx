import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardTable from "./DashboardTable";
import DashboardAlert from "./DashboardAlert";

export default function Dashboard() {
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
                    <DashboardAlert />
                    <DashboardTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
