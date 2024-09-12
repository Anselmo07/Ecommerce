// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction){
//         console.log(
//             `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`,
//         );
//         next();
//     }    
// } Local

export function loggerGloblal(req: Request, res: Response, next: NextFunction){
    const date = new Date();
    const formatearDate = date.toLocaleString()
    console.log(`[${formatearDate}] Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
    next();
}