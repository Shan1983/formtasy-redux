import { requireAuth } from "@/lib/auth/auth-utils";
import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/components/editor";
import EditorHeader from "@/features/editor/components/editor-header";
import { prefetchWorkflow } from "@/features/workflows/servers/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowIdPage = async ({ params }: PageProps) => {
  await requireAuth();

  const { workflowId } = await params;
  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default WorkflowIdPage;
