"use client";

import { LogoutButton } from "./(auth)/logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow queued");
      },
    })
  );

  return (
    <div className="font-sans min-h-screen min-w-screen flex flex-col gap-y-6 items-center justify-center">
      Protected {JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;
