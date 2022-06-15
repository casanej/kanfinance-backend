import { createTransactions, getCategoryById } from "controllers";
import { FastifyInstance } from "fastify"
import { checkUserExists } from "helpers";
import { TransactionDtoReqParams } from "models";


/* interface RouteTesteId {
    Querystring: {
        page: number;
    };
    Params: {
        id: number;
    };
}; */

export const transactionRoutes = (instance: FastifyInstance, _: any, next: any) => {
    instance.post<{ Body: TransactionDtoReqParams }>('/', {
        /* schema: {
            response: {
                200: { type: 'string' }
            }
        }, */
        preHandler: async (request, _, done) => {
            const category = await getCategoryById(instance.prisma, request.body.categoryId);

            request.body.category = category!;

            done();
        },
        handler: async (request, reply) => {
            const { value } = request.body;

            if (!value) reply.code(400).send({ success: false, message: 'Transaction value must be provided', code: 'transaction.value.not-found' })

            const newTransaction = await createTransactions(instance.prisma, request.body);

            return reply.status(201).send(newTransaction);
        }
    })

    next();
}