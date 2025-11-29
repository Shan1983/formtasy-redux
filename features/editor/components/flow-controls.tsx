"use client";

import { Button } from "@/components/ui/button";
import {
  LockIcon,
  MapIcon,
  PlusIcon,
  ScalingIcon,
  UnlockIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { memo, useCallback } from "react";
import {
  useReactFlow,
  useStore,
  useStoreApi,
  type ReactFlowState,
} from "@xyflow/react";

type FlowControlsProps = {
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
};

const selector = (state: ReactFlowState) => ({
  isInteractive:
    state.nodesDraggable || state.nodesConnectable || state.elementsSelectable,
  minZoomReached: state.transform[2] <= state.minZoom,
  maxZoomReached: state.transform[2] >= state.maxZoom,
  hasNodes: state.nodes.length > 0,
});

export const FlowControls = memo(
  ({ showMiniMap, onToggleMiniMap }: FlowControlsProps) => {
    const store = useStoreApi();
    const { zoomIn, zoomOut, fitView, getNodes } = useReactFlow();
    const { isInteractive, minZoomReached, maxZoomReached, hasNodes } =
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
      <div className="flex items-center bg-background rounded border p-1 gap-x-1">
        <Button
          onClick={handleZoomIn}
          disabled={maxZoomReached}
          size="icon"
          variant={"ghost"}
          className="bg-background"
        >
          <ZoomInIcon className="size-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          disabled={minZoomReached}
          size="icon"
          variant={"ghost"}
          className="bg-background"
        >
          <ZoomOutIcon className="size-4" />
        </Button>
        <Button
          onClick={handleFitView}
          size="icon"
          variant={"ghost"}
          className="bg-background"
        >
          <ScalingIcon className="size-4" />
        </Button>
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
        <Button
          onClick={onToggleMiniMap}
          size="icon"
          variant={"ghost"}
          className="bg-background"
          aria-pressed={showMiniMap}
        >
          <MapIcon className="size-4" />
        </Button>
        <Button
          onClick={() => {}}
          size="icon"
          variant={"ghost"}
          className="bg-background"
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
    );
  }
);

FlowControls.displayName = "FlowControls";
