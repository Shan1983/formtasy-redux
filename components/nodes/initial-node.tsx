"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { PlaceholderNode } from "../nodes/react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "../nodes/workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  const handleOpenPanelSelector = () => {
    const trigger = document.querySelector(
      "[data-node-selector-trigger]"
    ) as HTMLElement | null;
    trigger?.click();
  };

  return (
    <WorkflowNode showToolbar={false}>
      <PlaceholderNode {...props} onClick={handleOpenPanelSelector}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
