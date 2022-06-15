import { PrismaClient } from "@prisma/client";
import { getUser } from "controllers";

export const checkUserExists = async (prisma: PrismaClient, id?: number) => {
    if (!id) return null;

    const user = await getUser(prisma, id);

    console.log("[USER EXIST ?]", id, user);

    return user;
}