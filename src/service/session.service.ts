import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({user: userId, userAgent: userAgent});
    return session.toJSON();
};

export const findSession = async (query: FilterQuery<SessionDocument>) => {
    return SessionModel.find(query).lean();
};