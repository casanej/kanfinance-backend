import { Category, User } from "@prisma/client";

export interface TransactionDBModel {
    id: number;
    value: number;
    createdDate: Date;
    updatedDate: Date;
    userId: number;
    bankId?: number;
    categoryId?: number;
    objectiveId?: number;
}

export interface TransactionDtoReqParams extends Pick<TransactionDBModel, "value" | "userId" | "categoryId"> {
    user: User;
    category: Category;
}