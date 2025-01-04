'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { getAvailableCountries, Country } from '../../api/countries';

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAvailableCountries();

        setCountries(response);
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Countries</h1>
      <ul className="flex flex-wrap gap-4">
        {countries.map((country) => (
          <li key={country.countryCode} className="flex-none">
            <Link
              href={`/country/${country.countryCode}-${country.name}`}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesPage;
