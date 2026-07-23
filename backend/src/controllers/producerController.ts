import type { Request, Response } from "express";

import { getProducerWinIntervals } from "../services/producerService";

export function getProducerIntervals(_req: Request, res: Response): void {
  res.status(200).json(getProducerWinIntervals());
}
