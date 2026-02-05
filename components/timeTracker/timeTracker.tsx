import StopWatch from "../stopwatch/stopwatch";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TimeTracker() {
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
