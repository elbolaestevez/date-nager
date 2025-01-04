'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import {
  getCountryFlags,
  getCountryBorders,
  CountryBorder,
} from '../../../api/countries';
import { Loading } from '../../../../components/Loading';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

const CountryInfoPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const [countryCodePath, countryNamePath] = pathParts[2].split('-');
  const router = useRouter();

  const [countryName, setCountryName] = useState<string>('');
  const [countryFlag, setCountryFlag] = useState<string | null>('');

  const [borders, setBorders] = useState<CountryBorder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        if (countryCodePath && countryNamePath) {
          const bordersResponse = await getCountryBorders(countryCodePath);
          setBorders(bordersResponse);
          try {
            const flagResponse = await getCountryFlags(countryNamePath);
            setCountryName(flagResponse.name);
            setCountryFlag(flagResponse.flag);
          } catch {
            setCountryFlag(null);
            setCountryName(countryNamePath);
          }
        }
      } catch {
        setError('Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCodePath, countryNamePath]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <FaArrowLeft
        className="mr-2 mb-8"
        onClick={() => router.push('/countries')}
      />
      <h1 className="text-2xl font-bold mb-4">{countryName}</h1>
      <div className="w-128 h-96  overflow-hidden mb-4 relative">
        {countryFlag ? (
          <Image
            src={countryFlag || ''}
            alt={`${countryName} flag`}
            objectFit="cover"
            className="absolute"
            width={583}
            height={300}
          />
        ) : (
          <div>No hay imagen disponible</div>
        )}
      </div>
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
