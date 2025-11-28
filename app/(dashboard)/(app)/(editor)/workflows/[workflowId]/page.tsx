import { requireAuth } from "@/lib/auth/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowIdPage = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;
  return <div>Workflow Id: {workflowId}</div>;
};

export default WorkflowIdPage;
