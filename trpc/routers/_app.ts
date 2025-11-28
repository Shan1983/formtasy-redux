import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/lib/database";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    const data = db.workflow.findMany({});
    return { success: true, message: "Workflows fetched", data };
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
