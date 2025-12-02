import { HttpRequestNode } from "@/components/nodes/actions/components/http-request/node";
import { InitialNode } from "@/components/nodes/initial-node";
import { ManualTriggerNode } from "@/components/nodes/triggers/components/manual-trigger/node";
import { NodeType } from "@/lib/generated/prisma/enums";

import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST_EVENT]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
