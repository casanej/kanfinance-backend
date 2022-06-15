import { FastifyInstance } from "fastify"
import { transactionRoutes } from "./transactions";

export const v1Routes = (instance: FastifyInstance, options: any, next: any) => {
    instance.register(transactionRoutes, { prefix: '/transactions' });

    next();
}