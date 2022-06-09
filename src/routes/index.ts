import { FastifyInstance } from "fastify"
import { v1Routes } from "./v1";

export const appRoutes = (instance: FastifyInstance, options: any, next: any) => {
    instance.register(v1Routes, { prefix: '/v1' });

    next();
}