import { PrismaClient } from "@prisma/client";
import { getUser } from "controllers";

export const checkUserExists = async (prisma: PrismaClient, id?: number) => {
    if (!id) return null;

    const user = getUser(prisma, id);

    return user;
}