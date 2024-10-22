import { NextFunction, Request, Response } from "express";

export function loggerGloblal(req: Request, res: Response, next: NextFunction){
    const date = new Date();
    const formatearDate = date.toLocaleString()
    const method = req.method; // Método HTTP (GET, POST, etc.)
    const path = req.originalUrl; // Ruta invocada

    console.log(`[${date}] ${method} - ${path}`);
    next();
}