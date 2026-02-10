"use client";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

import TaskForm from "@/components/taskForm/taskForm";

export default function Tasks() {
  return (
    <div>
      <TaskForm />
    </div>
  );
}
