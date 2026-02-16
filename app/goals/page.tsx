import { GoalsSection } from "@/components/goals/goalsSection/goalsSection";

export default function Goals() {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <GoalsSection />
      </div>
    </div>
  );
}
