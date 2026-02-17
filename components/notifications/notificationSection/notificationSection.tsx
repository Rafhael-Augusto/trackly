import { getTasks } from "@/services/tasks";
import { NotificationList } from "@/components/notifications";

export async function NotificationSection() {
  const data = await getTasks();

  return <NotificationList data={data} />;
}
