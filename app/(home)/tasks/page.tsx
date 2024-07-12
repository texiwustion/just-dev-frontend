"use client";

import TaskListOverrall from "@/app/(home)/tasks/components/task-list-overrall";
import { BASE_URL } from "@/lib/global";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";

const fakeData = {
  task_lists: [
    {
      id: "1",
      name: "任务列表一",
      tasks: [
        { id: "101", assignees: [{ id: "a1" }, { id: "a2" }] },
        { id: "102", assignees: [{ id: "a3" }] },
      ],
    },
    {
      id: "2",
      name: "任务列表二",
      tasks: [
        { id: "201", assignees: [{ id: "a4" }] },
        { id: "202", assignees: [{ id: "a5" }, { id: "a6" }] },
      ],
    },
  ],
};

const TaskListsPage: React.FC = () => {
  const userId = useUserStore(stats => stats.userId);
  const urlPrefix = `/api/users/`;
  const urlSuffix = `/task_lists`;
  const { data, error } = useSWR(
    userId ? [urlPrefix, userId, urlSuffix] : null,
    ([urlPrefix, userId, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + userId + urlSuffix, {
        credentials: "include",
      }).then(res => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { task_lists: [] } }
  );
  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <TaskListOverrall taskLists={data.task_lists} />
    </div>
  );
};

export default TaskListsPage;
