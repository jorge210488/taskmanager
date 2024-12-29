import { Request, Response, NextFunction } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toISOString();
  const origin = req.headers.origin || req.headers.host || 'origen desconocido';

  console.log(
    `[${now}] Solicitud desde ${origin} ejecutando un método ${req.method} en la ruta ${req.url}`,
  );

  next();
}
