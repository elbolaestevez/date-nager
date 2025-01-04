import { Request, Response } from "express";
import { CountriesService } from "../services/countries.service";

export class CountriesController {
  static async getAvailableCountries(req: Request, res: Response) {
    try {
      const countries = await CountriesService.getAvailableCountries();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch available countries" });
    }
  }
  static async getCountryBorders(req: Request, res: Response) {
    try {
      const { countryCode } = req.params;
      const borders = await CountriesService.getCountryBorders(countryCode);
      res.json(borders);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch borders for country` });
    }
  }
  static async getCountryPopulation(req: Request, res: Response) {
    try {
      const { countryName } = req.params;
      console.log("countryName", countryName);
      const population = await CountriesService.getCountryPopulation(
        countryName
      );
      res.json(population);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch population for country" });
    }
  }

  static async getCountryFlags(req: Request, res: Response) {
    try {
      const { countryName } = req.params;
      console.log("countryName", countryName);
      const population = await CountriesService.getCountryFlags(
        countryName
      );
      res.json(population);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flags for country" });
    }
  }
}
