"use client";

import IncompletedTaskTable from "@/components/project-dashboard/IncompletedTaskTable";
import NewDraft from "@/components/project-dashboard/NewDraft";
import NewRequirement from "@/components/project-dashboard/NewRequirement";

export default function DashboardPage({
    params: { project_id },
}: {
    params: { project_id: string };
}) {
    return (
        <div className="space-y-4">
            <div></div>
            <div className="flex items-start">
                <div></div>
                <div>
                    <NewDraft projectId={project_id} />
                    <NewRequirement projectId={project_id} />
<<<<<<< Updated upstream
=======
                    <IncompletedTaskTable project_id={project_id} />
>>>>>>> Stashed changes
                </div>
            </div>
        </div>
    );
}
