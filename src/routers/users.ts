import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const usersRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db.select().from(users).where(eq(users.id, input.id));
      return result[0];
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const result = await db.insert(users).values(input).returning();
      return result[0];
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
      return result[0];
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(users).where(eq(users.id, input.id));
      return { success: true };
    }),
});