import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify"

async function main(prisma: PrismaClient) {
    const allUsers = await prisma.user.findMany();

    console.log(allUsers)
}

async function create(prisma: PrismaClient) {
    await prisma.user.create({
        data: {
            name: 'Alice',
            username: 'casanje',
        },
    })
}

interface RouteTesteId {
    Querystring: {
        page: number;
    };
    Params: {
        id: number;
    };
};

export const bankStatementRoutes = (instance: FastifyInstance, options: any, next: any) => {
    instance.get<RouteTesteId>('/resume/:id', {
        schema: {
            response: {
                200: { type: 'string' }
            }
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const { page } = request.query;

            const prisma = instance.prisma;

            main(prisma)
                .catch((e) => {
                    throw e
                })
                .finally(async () => {
                    await prisma.$disconnect()
                })

            return reply.send(`Hello bank ${id}`);
        }
    })

    instance.get<RouteTesteId>('/create', {
        schema: {
            response: {
                200: { type: 'string' }
            }
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const { page } = request.query;

            const prisma = instance.prisma;

            return reply.status(201).send(`Hello bank ${id}`);
        }


    })

    next();
}