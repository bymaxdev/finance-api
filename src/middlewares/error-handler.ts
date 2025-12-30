import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { ZodError } from "zod";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    res.status(400).json({
      message: "Erro de validação",
      errors,
    });
    return;
  }

  console.error(error);
  res.status(500).json({ message: "Erro interno do servidor." });
};
