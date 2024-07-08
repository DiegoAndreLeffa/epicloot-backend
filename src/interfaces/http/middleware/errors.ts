import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    console.log(error.statusCode);
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      errors: error.errors.map(e => ({ path: e.path, message: e.message })),
    });
  }

  if (error.message.includes("invalid input syntax for type uuid")) {
    return response.status(404).json({
      message: "invalid UUID",
    });
  }
  return response.status(500).json({
    message: "Internal server error",
  });
};
