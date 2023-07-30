import express from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";


export const createUserSessionHandler = async (req: express.Request, res: express.Response) => {
    // validate user password
    const user = await validatePassword(req.body);
    if(!user){
        return res.status(401).send("Invalid email or password");
    }
    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "")

    // create an access token
    const accessTokenTtl = config.get<string>("accessTokenTtl"); // 30 minutes
    const accessToken = signJwt({
        ...user, 
        session: session._id
        },
        {expiresIn: accessTokenTtl}
    );

    // create a refresh token
    const refreshTokenTtl = config.get<string>("refreshTokenTtl");
    const refreshToken = signJwt({
        ...user, 
        session: session._id
        }, {expiresIn: refreshTokenTtl}
    );

    // return access and refresh tokens
    return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
};