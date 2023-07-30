import express from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";


export const createUserSessionHandler = async (req: express.Request, res: express.Response) => {
    // validate user password
    const user = await validatePassword(req.body);
    if(!user){
        return res.status(401).send("Invalid email or password");
    }
    // create a session
    const session = createSession(user._id, req.get("user-agent") || "")

    // create an access token

    // create a refresh token

    // return access and refresh tokens
};