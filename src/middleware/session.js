import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import { verifyToken } from "../utils/jwt.handle";

const checkSession = (req, res, next) => {
    try {
        const jwtRequest = req.headers.authorization || '';
        const jwt = jwtRequest?.split(' ').pop();
       // const verifiedToken = verifyToken(`${jwt}`);
        console.log(verifiedToken);
        verifiedToken ? next() : handleHttp(res, 'FORBIDDEN', 'INVALID_SESSION');
    } catch (error) {
        handleHttp(res, 'FORBIDDEN', 'INVALID_SESSION');
    }
}

export { checkSession };