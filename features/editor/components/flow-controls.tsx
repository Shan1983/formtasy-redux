"use client";

import { Button } from "@/components/ui/button";
import {
  LockIcon,
  MapIcon,
  PlayIcon,
  PlusIcon,
  ScalingIcon,
  SparklesIcon,
  TestTubeDiagonalIcon,
  UnlockIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  useReactFlow,
  useStore,
  useStoreApi,
  type ReactFlowState,
} from "@xyflow/react";
import { NodeSelector } from "@/components/nodes/node-selector";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type FlowControlsProps = {
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
};

const selector = (state: ReactFlowState) => ({
  isInteractive:
    state.nodesDraggable || state.nodesConnectable || state.elementsSelectable,
  minZoomReached: state.transform[2] <= state.minZoom,
  maxZoomReached: state.transform[2] >= state.maxZoom,
});

export const FlowControls = memo(
  ({ showMiniMap, onToggleMiniMap }: FlowControlsProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    const store = useStoreApi();
    const { zoomIn, zoomOut, fitView, getNodes } = useReactFlow();

    const { isInteractive, minZoomReached, maxZoomReached } =
      useStore(selector);

    const handleZoomIn = useCallback(() => {
      void zoomIn();
    }, [zoomIn]);

    const handleZoomOut = useCallback(() => {
      void zoomOut();
    }, [zoomOut]);

    const handleFitView = useCallback(() => {
      const nodesToFit = getNodes();
      if (nodesToFit.length === 0) return;
      void fitView({
        nodes: nodesToFit,
        padding: 0.2,
        includeHiddenNodes: true,
        duration: 150,
      });
    }, [fitView, getNodes]);

    const handleToggleInteractivity = useCallback(() => {
      const nextInteractiveState = !isInteractive;
      store.setState({
        nodesDraggable: nextInteractiveState,
        nodesConnectable: nextInteractiveState,
        elementsSelectable: nextInteractiveState,
      });
    }, [isInteractive, store]);

    return (
      <div className="flex flex-col items-center bg-background rounded-sm border p-1 py-2 gap-x-1 shadow">
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
          <span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-node-selector-trigger
                  onClick={() => {}}
                  size="icon"
                  variant={"ghost"}
                  className={cn("bg-background", selectorOpen && "bg-muted")}
                >
                  <PlusIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Add node</p>
              </TooltipContent>
            </Tooltip>
          </span>
        </NodeSelector>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {}}
              size="icon"
              variant={"ghost"}
              className="bg-background"
              disabled={getNodes().length === 0}
            >
              <SparklesIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Edit with AI</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {}}
              size="icon"
              variant={"ghost"}
              className="bg-background"
              disabled={getNodes().length === 0}
            >
              <PlayIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Run workflow</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {}}
              size="icon"
              variant={"ghost"}
              className="bg-background"
              disabled={getNodes().length === 0}
            >
              <TestTubeDiagonalIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Test workflow</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleZoomIn}
              disabled={maxZoomReached}
              size="icon"
              variant={"ghost"}
              className="bg-background"
            >
              <ZoomInIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom in</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleZoomOut}
              disabled={minZoomReached}
              size="icon"
              variant={"ghost"}
              className="bg-background"
            >
              <ZoomOutIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom out</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleFitView}
              disabled={getNodes().length === 0}
              size="icon"
              variant={"ghost"}
              className="bg-background"
            >
              <ScalingIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Fit view</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleInteractivity}
              size="icon"
              variant={"ghost"}
              className="bg-background"
              aria-pressed={!isInteractive}
            >
              {isInteractive ? (
                <LockIcon className="size-4" />
              ) : (
                <UnlockIcon className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>
              {isInteractive ? "Disable interactivity" : "Enable interactivity"}
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Toggle
                pressed={showMiniMap}
                onPressedChange={() => onToggleMiniMap()}
                size="sm"
                aria-label="Toggle minimap"
              >
                <MapIcon className="size-4" />
              </Toggle>
            </span>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{showMiniMap ? "Hide minimap" : "Show minimap"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }
);

FlowControls.displayName = "FlowControls";
