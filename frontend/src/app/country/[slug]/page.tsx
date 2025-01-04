'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import {
  getCountryFlags,
  getCountryBorders,
  CountryBorder,
} from '../../../api/countries';

const CountryInfoPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const [countryCodePath, countryNamePath] = pathParts[2].split('-');

  const [countryName, setCountryName] = useState<string>('');
  const [countryFlag, setCountryFlag] = useState<string>('');

  const [borders, setBorders] = useState<CountryBorder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        if (countryCodePath && countryNamePath) {
          const flagResponse = await getCountryFlags(countryNamePath);
          const bordersResponse = await getCountryBorders(countryCodePath);

          setCountryName(flagResponse.name);
          setCountryFlag(flagResponse.flag);
          setBorders(bordersResponse);
        }
      } catch (err) {
        setError('Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCodePath, countryNamePath]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{countryName}</h1>
      <img src={countryFlag} alt={`${countryName} flag`} className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Border Countries</h2>
      <ul className="flex flex-wrap gap-4">
        {borders.map((border) => (
          <li key={border.countryCode} className="flex-none">
            <Link
              href={`/country/${border.countryCode}-${border.commonName}`}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2">Population Over Time</h2>
      <Link
        href={`population/${countryCodePath}-${countryNamePath}`}
        className="text-blue-500 hover:text-blue-700 underline"
      >
        View Population Chart
      </Link>
    </div>
  );
};

export default CountryInfoPage;
