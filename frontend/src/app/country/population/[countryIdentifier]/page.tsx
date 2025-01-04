'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PopulationChart } from '../../../../../components/PopulationChart';
import { PopulationCount, getCountryPopulation } from '@/api/countries';
import { Loading } from '../../../../../components/Loading';

const CountryInfoPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const countryNamePath = pathParts[3].split('-')[1];
  const [populationData, setPopulationData] = useState<PopulationCount[]>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        if (countryNamePath) {
          const populationResponse =
            await getCountryPopulation(countryNamePath);

          setPopulationData(populationResponse.populationCounts);
          setCountryName(populationResponse.country);
        }
      } catch (err) {
        setError('Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryNamePath]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{countryName}</h1>
      <PopulationChart data={populationData}></PopulationChart>
    </div>
  );
};

export default CountryInfoPage;
