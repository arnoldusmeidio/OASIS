import { Request, Response, NextFunction } from "express";

interface ErrorWithStatusCode extends Error {
   statusCode?: number;
}

export function error(error: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) {
   const locale = req.cookies.NEXT_LOCALE;

   const defaultError = {
      statusCode: error.statusCode || 500,
      message: error.message || locale == "id" ? "Terjadi kesalahan" : "General error. Sorry, and good luck",
   };

   console.error(error);

   return res.status(defaultError.statusCode).json({ message: defaultError.message });
}
