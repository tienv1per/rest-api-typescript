import express from "express";
import logger from "../utils/logger";

export async function createUserHandler(req: express.Request, res: express.Response){
    try {
        // call create user service
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
};