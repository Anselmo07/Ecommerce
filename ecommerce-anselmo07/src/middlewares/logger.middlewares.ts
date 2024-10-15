// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function loggerGloblal(req: Request, res: Response, next: NextFunction){
    const date = new Date();
    const formatearDate = date.toLocaleString()
    next();
}