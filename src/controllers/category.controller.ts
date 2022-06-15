import { PrismaClient } from "@prisma/client";

export const getCategoryById = (prisma: PrismaClient, id?: number) => {

    if (!id) return prisma.category.findFirst({
        where: {
            id: 1
        }
    })

    return prisma.category.findFirst({
        where: {
            id
        }
    })
}