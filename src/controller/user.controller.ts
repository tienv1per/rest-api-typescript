import express from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = async (
    req: express.Request<{}, {}, CreateUserInput["body"]>, 
    res: express.Response) => {
    try {
        // call create user service
        const user = await createUser(req.body);
        return res.status(200).json(omit(user.toJSON(), "password"));
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
};