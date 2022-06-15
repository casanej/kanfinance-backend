import { PrismaClient } from "@prisma/client";
import { TransactionDtoReqParams } from "models";

export const createTransactions = (prisma: PrismaClient, data: TransactionDtoReqParams) => {
    return prisma.transactions.create({
        data: {
            value: data.value,
            categoryId: data.category.id,
            userId: data.user.id,
        }
    })
}