import { Router } from "express";
import * as svc from "../services/truck.services";

export const trucksRouter = Router();

trucksRouter.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const data = await svc.listTrucks({ page, limit });
    res.json(data);
  } catch (e) {
    next(e);
  }
});

trucksRouter.get("/:id", async (req, res, next) => {
  try {
    const one = await svc.getTruckById(req.params.id);
    if (!one) return res.status(404).json({ message: "Not found" });
    res.json(one);
  } catch (e) {
    next(e);
  }
});
