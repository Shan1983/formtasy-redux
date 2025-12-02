"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";

import { GlobeIcon, MousePointerIcon, SearchIcon } from "lucide-react";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { NodeType } from "@/lib/generated/prisma/enums";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger manually",
    description:
      "Runs the flow on clicking a button. Good for getting started quickly",
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST_EVENT,
    label: "HTTP Request",
    description: "Executes an HTTP request and returns the response",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const [query, setQuery] = useState("");
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );
        if (hasManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow");
          return;
        }
      }

      setNodes((nodes) => {
        const hasInitialTrigger = nodes.some(
          (node) => node.type === NodeType.INITIAL
        );

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          type: selection.type,
          position: flowPosition,
          data: {},
        };

        if (hasInitialTrigger) return [newNode];

        return [...nodes, newNode];
      });
      setQuery("");
      onOpenChange(false);
    },
    [setNodes, getNodes, screenToFlowPosition, onOpenChange]
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filteredTriggerNodes = useMemo(
    () =>
      triggerNodes.filter((node) =>
        `${node.label} ${node.description}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  const filteredExecutionNodes = useMemo(
    () =>
      executionNodes.filter((node) =>
        `${node.label} ${node.description}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  const hasResults =
    filteredTriggerNodes.length > 0 || filteredExecutionNodes.length > 0;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="w-96 p-0 shadow-lg"
        sideOffset={10}
      >
        <PopoverArrow />
        <div className="border-b px-4 py-3">
          <div className="text-sm font-medium">Add a node</div>
          <p className="text-xs text-muted-foreground">
            Search for a trigger or an action to drop into your flow.
          </p>
          <div className="relative mt-3">
            <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search nodes..."
              className="pl-8"
              autoFocus
            />
          </div>
        </div>
        <div className="max-h-[360px] space-y-3 overflow-y-auto p-2">
          {filteredTriggerNodes.length > 0 && (
            <div className="space-y-2">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Triggers
              </p>
              {filteredTriggerNodes.map((nodeType) => {
                const Icon = nodeType.icon;

                return (
                  <button
                    key={nodeType.type}
                    type="button"
                    className="flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition hover:bg-muted/70"
                    onClick={() => handleNodeSelect(nodeType)}
                  >
                    {typeof Icon === "string" ? (
                      <img
                        src={Icon}
                        alt={nodeType.label}
                        className="mt-0.5 size-5 rounded-sm object-contain"
                      />
                    ) : (
                      <Icon className="mt-0.5 size-5" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {nodeType.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {nodeType.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {filteredTriggerNodes.length > 0 &&
            filteredExecutionNodes.length > 0 && <Separator className="mx-2" />}

          {filteredExecutionNodes.length > 0 && (
            <div className="space-y-2">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Actions
              </p>
              {filteredExecutionNodes.map((nodeType) => {
                const Icon = nodeType.icon;

                return (
                  <button
                    key={nodeType.type}
                    type="button"
                    className="flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition hover:bg-muted/70"
                    onClick={() => handleNodeSelect(nodeType)}
                  >
                    {typeof Icon === "string" ? (
                      <img
                        src={Icon}
                        alt={nodeType.label}
                        className="mt-0.5 size-5 rounded-sm object-contain"
                      />
                    ) : (
                      <Icon className="mt-0.5 size-5" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {nodeType.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {nodeType.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!hasResults && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No nodes found for "{query || "your search"}".
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
