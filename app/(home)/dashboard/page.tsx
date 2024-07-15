"use client"

import { ChartCard } from "../components/chartCard";
import { TasksTable } from "../tasks/components/tasksTable";


export default function DashboardPage() {
  return <>
  <ChartCard></ChartCard>
  <TasksTable data={[]} task_list_id={""}></TasksTable>
  </>;
}
