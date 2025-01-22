import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const DashboardAlert = () => {
    return (
        <Alert className="mb-4" variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
                You have a task that is overdue. Please complete it as soon as
            </AlertDescription>
        </Alert>
    );
};

export default DashboardAlert;
