import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { User } from '@prisma/client'

declare module 'fastify' {
    interface FastifyInstance {
        user: User;
    }
}

export const prismaUserPlugin: FastifyPluginAsync = fp(async (server, _) => {

    server.decorate('user', undefined)

    server.addHook('onRequest', async (request, reply) => {
        const userId = request.headers.authorization;

        if (!userId) return reply.code(401).send({ success: false, message: 'User not authenticated', code: 'user.not-authenticated' });

        const user = await server.prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });

        if (!user) return reply.code(401).send({ success: false, message: 'User not authenticated', code: 'user.not-authenticated' });

        server.user = user;
    })
})