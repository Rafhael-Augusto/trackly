import { Goals } from "@/types";

import { GoalsList } from "@/components/goals";

export async function GoalsSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goals`);
  const data: Goals[] = await res.json();

  return <GoalsList data={data} />;
}
