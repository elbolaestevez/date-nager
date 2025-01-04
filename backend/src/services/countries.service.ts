import axios from "axios";
import { API_BASE_URL_NAGER, API_BASE_URL_COUNTRIES_NOW } from "../config";

export class CountriesService {
  static async getAvailableCountries() {
    try {
      const response = await axios.get(
        `${API_BASE_URL_NAGER}/AvailableCountries`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available countries:", error);
      throw error;
    }
  }
  static async getCountryBorders(countryCode: string) {
    try {
      const response = await axios.get(
        `${API_BASE_URL_NAGER}/CountryInfo/${countryCode}`
      );
      return response.data.borders;
    } catch (error) {
      console.error(
        `Error fetching borders for country ${countryCode}:`,
        error
      );
      throw error;
    }
  }
  static async getCountryPopulation(country: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL_COUNTRIES_NOW}/population`,
        { country: country }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching population for country ${country}:`, error);
      throw error;
    }
  }

  static async getCountryFlags(country: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL_COUNTRIES_NOW}/flag/images`,
        { country: country }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching country flags:", error);
      throw error;
    }
  }
}
