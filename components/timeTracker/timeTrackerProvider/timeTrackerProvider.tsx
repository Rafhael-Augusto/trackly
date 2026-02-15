"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type TimeTrackerType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const TimeTrackerContext = createContext<TimeTrackerType | undefined>(
  undefined,
);

export const TimeTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TimeTrackerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </TimeTrackerContext.Provider>
  );
};

export const useTimeTrackerContext = () => {
  const context = useContext(TimeTrackerContext);
  if (!context) {
    throw new Error(
      "useTimeTrackerContext deve ser usado dentro de um TimeTrackerProvider",
    );
  }
  return context;
};
