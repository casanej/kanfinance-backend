import { User } from "@prisma/client";
import { FastifyInstance } from "fastify"
import { checkUserExists } from "helpers";
import { v1Routes } from "./v1-web";

export const appRoutes = (instance: FastifyInstance, options: any, next: any) => {

    instance.addHook<{ Body: { userId: number; user: User; } }>('preHandler', async (request, reply) => {
        const userId = request.body.userId;
        const user = await checkUserExists(instance.prisma, userId);

        if (!user) return reply.code(400).send({ success: false, message: 'User not found', code: 'user.not-found' });

        request.body.user = user;
    })

    instance.register(v1Routes, { prefix: '/v1' });

    next();
}