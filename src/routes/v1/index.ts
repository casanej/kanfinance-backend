import { FastifyInstance } from "fastify"
import { bankStatementRoutes } from "./bank-statement";

export const v1Routes = (instance: FastifyInstance, options: any, next: any) => {
    instance.register(bankStatementRoutes, { prefix: '/bank-statement' });

    next();
}