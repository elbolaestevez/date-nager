import { countriesRoutes } from "./countries.routes";

import { Router } from "express";

const router = Router();

router.use("/countries", countriesRoutes);

export { router as allRoutes };
