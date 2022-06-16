import { PrismaClient } from "@prisma/client";
import { TransactionDtoReqParams } from "models";

export const getTransactions = async (prisma: PrismaClient, userId: number) => {
    const transaction = await prisma.transactions.findMany({
        where: {
            userId
        },
        orderBy: {
            createdDate: 'desc'
        },
        include: {
            category: true,
            objective: true
        }
    });

    return transaction;
}

export const getTransactionById = async (prisma: PrismaClient, id: number, userId: number) => {
    const transaction = await prisma.transactions.findFirst({
        where: {
            id,
            userId
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