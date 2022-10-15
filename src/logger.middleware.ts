import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request incoming');
  next();
}
