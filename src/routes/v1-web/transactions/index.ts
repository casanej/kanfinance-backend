import { createTransactions, getCategoryById, getTransactionById } from "controllers";
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

    instance.get<{ Params: { id: string } }>('/:id', {
        handler: async (request, reply) => {
            const id = parseInt(request.params.id);
            if (id <= 0) return reply.code(400).send({ success: false, message: 'Invalid id', code: 'transaction.invalid-id' });

            const transaction = await getTransactionById(instance.prisma, id);

            if (transaction) return reply.code(200).send({ success: true, data: transaction });

            return reply.code(404).send({ success: false, message: 'Transaction not found', code: 'transaction.not-found' });
        }
    })

    instance.post<{ Body: TransactionDtoReqParams }>('/', {
        preHandler: async (request, _, done) => {
            const category = await getCategoryById(instance.prisma, request.body.categoryId);

            request.body.category = category!;

            done();
        },
        handler: async (request, reply) => {
            const { value } = request.body;

            if (!value) reply.code(400).send({ success: false, message: 'Transaction value must be provided', code: 'transaction.value.not-found' })

            const newTransaction = await createTransactions(instance.prisma, request.body);

            return reply.status(201).send({ success: true, data: newTransaction });
        }
    })

    next();
}