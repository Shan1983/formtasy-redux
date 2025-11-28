import db from "@/lib/database";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ step }) => {
    await step.sleep("wait", "2s");
    await step.run("create-workflow", () => {
      return db.workflow.create({
        data: {
          name: "test-workflow",
        },
      });
    });
  }
);
