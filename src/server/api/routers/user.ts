// no protectoed procedure yet because we don't have auth yet
// https://github.com/jherr/notetaker/blob/main/src/server/api/trpc.ts

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `user rout Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  createUser: publicProcedure
  .input(z.object({ 
    email: z.string(), 
    name: z.string(), 
  }))
  .mutation(({ ctx, input }) => {
    return ctx.db.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
      
    });
  }),

});
