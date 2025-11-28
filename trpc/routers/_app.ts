import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/lib/database";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "AI queued" };
  }),
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return db.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@example.com",
      },
    });

    return { success: true, message: "Workflow queued" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
