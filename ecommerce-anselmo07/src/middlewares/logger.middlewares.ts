import { NextFunction, Request, Response } from "express";

export function loggerGloblal(req: Request, res: Response, next: NextFunction){
    const date = new Date();
    const formatearDate = date.toLocaleString()
    const method = req.method; 
    const path = req.originalUrl; 

    console.log(`[${date}] ${method} - ${path}`);
    next();
}