import { FastifyInstance } from "fastify"
import { transactionRoutes } from "./transactions";
import { userRoutes } from "./user";

export const v1Routes = (instance: FastifyInstance, options: any, next: any) => {
    instance.register(userRoutes, { prefix: '/user' });
    instance.register(transactionRoutes, { prefix: '/transactions' });

    next();
}