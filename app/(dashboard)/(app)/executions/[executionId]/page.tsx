import { requireAuth } from "@/lib/auth/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ executionId: string }>;
}

const ExecutionsPage = async ({ params }: PageProps) => {
  await requireAuth();
  const { executionId } = await params;
  return <div>Execution Id: {executionId}</div>;
};

export default ExecutionsPage;
