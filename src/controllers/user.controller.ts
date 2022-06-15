import { PrismaClient } from "@prisma/client";

interface UserRelationsIncludes {
    _count: boolean;
    bankAccounts: boolean;
    credidCards: boolean;
    objectives: boolean;
    schedules: boolean;
    transactions: boolean;
}

export const getUser = async (prisma: PrismaClient, id?: number, include?: UserRelationsIncludes) => {
    if (!id) return null;

    const user = await prisma.user.findFirst({
        where: {
            id,
        },
        include
    });

    return user;
}