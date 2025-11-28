"use client";

import { Button } from "@/components/ui/button";
import { LogoutButton } from "./(auth)/logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testLocalAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success("AI queued");
      },
      onError: () => {
        toast.error("AI failed");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow queued");
      },
      onError: () => {
        toast.error("Workflow failed");
      },
    })
  );

  return (
    <div className="font-sans min-h-screen min-w-screen flex flex-col gap-y-6 items-center justify-center">
      Protected {JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Button
        disabled={testLocalAI.isPending}
        onClick={() => testLocalAI.mutate()}
      >
        Test local AI
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;
