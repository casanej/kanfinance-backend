import { User } from "@prisma/client";

export interface Authorization {
    Headers: {
        authorization: string;
    };
    Body: {
        user: User;
    };
}