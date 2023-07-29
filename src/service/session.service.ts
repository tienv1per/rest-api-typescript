import SessionModel from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({user: userId, userAgent: userAgent});
    return session.toJSON();
};