"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const connection_1 = require("../db/connection");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.usersRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.query(async () => {
        return await connection_1.db.select().from(schema_1.users);
    }),
    getById: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input }) => {
        const result = await connection_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, input.id));
        return result[0];
    }),
    create: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
    }))
        .mutation(async ({ input }) => {
        const result = await connection_1.db.insert(schema_1.users).values(input).returning();
        return result[0];
    }),
    update: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string().min(1).optional(),
        email: zod_1.z.string().email().optional(),
    }))
        .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const result = await connection_1.db.update(schema_1.users).set(data).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).returning();
        return result[0];
    }),
    delete: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .mutation(async ({ input }) => {
        await connection_1.db.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, input.id));
        return { success: true };
    }),
});
