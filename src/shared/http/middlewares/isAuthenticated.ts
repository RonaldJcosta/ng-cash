import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { Secret, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const data = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = data as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    console.error(err);
    throw new AppError('Invalid JWT Token', 401);
  }
}
