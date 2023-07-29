import express from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";

export const createUserHandler = async (req: express.Request, res: express.Response) =>{
    try {
        // call create user service
        const user = await createUser(req.body);
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
};