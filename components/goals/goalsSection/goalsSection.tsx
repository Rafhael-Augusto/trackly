import { getGoals } from "@/services/goals";

import { GoalsList } from "@/components/goals";

export async function GoalsSection() {
  const data = await getGoals();

  return <GoalsList data={data} />;
}
