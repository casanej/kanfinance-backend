import { PrismaClient } from "@prisma/client";
import { TransactionDtoReqParams } from "models";

export const getTransactionById = async (prisma: PrismaClient, id: number) => {
    const transaction = await prisma.transactions.findUnique({
        where: {
            id
        }
    });

    return transaction;
}

export const createTransactions = (prisma: PrismaClient, data: TransactionDtoReqParams) => {
    return prisma.transactions.create({
        data: {
            value: data.value,
            categoryId: data.category.id,
            userId: data.user.id,
        }
    })
}