"use client";

import { type NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode } from "react";
import {
  BaseNode,
  BaseNodeContent,
} from "@/components/nodes/react-flow/base-node";
import { BaseHandle } from "@/components/nodes/react-flow/base-handle";
import { WorkflowNode } from "@/components/nodes/workflow-node";
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/nodes/react-flow/node-status-indicator";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    status = "initial",
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      const updatedNodes = setNodes((currentNodes) =>
        currentNodes.filter((node) => node.id !== id)
      );
      const updatedEdges = setEdges((currentEdges) =>
        currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
      );
    };

    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
      >
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl"
        >
          <BaseNode
            id={id}
            onDoubleClick={onDoubleClick}
            className="rounded-l-2xl relative group"
            nodeStatus={status}
          >
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}

              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
