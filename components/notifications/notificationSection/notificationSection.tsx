import { NotificationList } from "@/components/notifications";
import { getNotifications } from "@/services/notifications";

export async function NotificationSection() {
  const data = await getNotifications();

  return <NotificationList data={data} />;
}
