import { Router } from "express";
import { getProducerIntervals } from "../controllers/producerController";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/producers/interval", getProducerIntervals);

export default router;
