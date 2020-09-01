import { Response } from "express";

export const errorHandler = (
  res: Response,
  code: number,
  message: string
): void => {
  res.status(code).send(
    JSON.stringify({
      code,
      message,
    })
  );
};
