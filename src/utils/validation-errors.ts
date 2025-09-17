import type { Response } from "express";
import type { ZodError } from "zod";

export const handleValidationError = (error: ZodError, res: Response) => {
  return res.status(400).json({
    message: "Erro de validação.",
    errors:  error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))
  });
};