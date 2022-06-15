import { FastifyInstance } from "fastify"
import { Authorization } from "models";
import { prismaUserPlugin } from "plugins";
import { v1Routes } from "./v1-web";

export const appRoutes = (instance: FastifyInstance, options: any, next: any) => {

    instance.register(prismaUserPlugin)

    instance.register(v1Routes, { prefix: '/v1' });

    next();
}