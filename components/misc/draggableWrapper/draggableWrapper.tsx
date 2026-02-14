"use client";

import { ReactNode, useRef } from "react";
import Draggable from "react-draggable";

export function DraggableWrapper({ children }: { children: ReactNode }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} bounds={"parent"}>
      <div className="w-1/5 cursor-move" ref={nodeRef}>
        {children}
      </div>
    </Draggable>
  );
}
