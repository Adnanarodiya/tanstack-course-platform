import { createServerFn } from "@tanstack/react-start";
import { unauthenticatedMiddleware } from "~/lib/auth";
import { z } from "zod";
import { getComments } from "~/data-access/comments";

export const getCommentsFn = createServerFn()
  .middleware([unauthenticatedMiddleware])
  .validator(z.object({ segmentId: z.number() }))
  .handler(async ({ data }) => {
    return getComments(data.segmentId);
  });
