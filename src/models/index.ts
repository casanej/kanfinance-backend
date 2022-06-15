export * from './authorization';
export * from './dto';

interface ReplySuccess<T> {
    success: true;
    data: T;
}

interface ReplyFailed {
    success: false;
    message: string;
    code: string;
    globalCode: string;
}

export type ReplyMessage<T = undefined> = ReplySuccess<T> | ReplyFailed;