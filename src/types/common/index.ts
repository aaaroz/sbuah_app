import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export type TGenericResponse<T, K> = {
  message: T;
  data?: K | K[] | null;
};

export interface ICustomRequest extends Request {
  user?: JwtPayload | string;
}
