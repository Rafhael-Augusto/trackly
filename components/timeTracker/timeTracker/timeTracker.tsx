import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StopWatch } from "@/components/timeTracker";

export function TimeTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Tracker</CardTitle>
      </CardHeader>

      <CardContent>
        <StopWatch />
      </CardContent>
    </Card>
  );
}
