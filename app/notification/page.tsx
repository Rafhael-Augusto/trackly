import { NotificationSection } from "@/components/notifications/notificationSection/notificationSection";

export default function Notification() {
  return (
    <div className="grid grid-cols-4 my-4">
      <div className="col-span-3">
        <NotificationSection />
      </div>
    </div>
  );
}
