import { Router } from "express";
import { CountriesController } from "../controllers/countries.controller";

const router = Router();

router.get("/available", CountriesController.getAvailableCountries);
router.get("/:countryCode/borders", CountriesController.getCountryBorders);
router.get(
  "/:countryName/population",
  CountriesController.getCountryPopulation
);
router.get(
    "/:countryName/flags",
    CountriesController.getCountryFlags
  );

export { router as countriesRoutes };
