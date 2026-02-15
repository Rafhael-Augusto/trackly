import { GoalsList, GoalsTable } from "@/components/goals";

export default function Goals() {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <GoalsList />
      </div>
    </div>
  );
}
