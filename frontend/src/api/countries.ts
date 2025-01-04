const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Country {
  countryCode: string;
  name: string;
}

export interface PopulationCount {
  year: number;
  value: number;
}

interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

export interface CountryPopulationResponse {
  error: boolean;
  msg: string;
  data: CountryPopulation;
}

export interface CountryBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
}

interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface CountryFlagResponse {
  error: boolean;
  msg: string;
  data: CountryFlag;
}

export const getAvailableCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/available`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data: Country[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch countries');
  }
};

export const getCountryBorders = async (
  countryCode: string
): Promise<CountryBorder[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/countries/${countryCode}/borders`,
      {
        cache: 'force-cache',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch countries Borders');
    }
    const data: CountryBorder[] = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch countries Borders');
  }
};

export const getCountryPopulation = async (
  countryName: string
): Promise<CountryPopulation> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/countries/${countryName}/population`,
      {
        cache: 'force-cache',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch country population');
    }
    const data: CountryPopulationResponse = await response.json();
    return data.data;
  } catch (err) {
    throw new Error('Failed to fetch country population');
  }
};

export const getCountryFlags = async (
  countryName: string
): Promise<CountryFlag> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/countries/${countryName}/flags`,
      {
        cache: 'force-cache',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch countries Flags');
    }
    const data: CountryFlagResponse = await response.json();
    return data.data;
  } catch (err) {
    throw new Error('Failed to fetch countries Flags');
  }
};
