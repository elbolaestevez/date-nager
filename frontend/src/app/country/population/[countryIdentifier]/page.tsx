'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PopulationChart } from '../../../../../components/PopulationChart';
import { PopulationCount, getCountryPopulation } from '@/api/countries';
import { Loading } from '../../../../../components/Loading';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const CountryInfoPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const router = useRouter();
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

  return (
    <div className="p-4">
      <FaArrowLeft
        className="mr-2 mb-8"
        onClick={() =>
          router.push(
            `/country/${pathParts[3].split('-')[0]}-${pathParts[3].split('-')[1]}`
          )
        }
      />
      <h1 className="text-2xl font-bold mb-4">{countryName}</h1>
      {error ? (
        <p>No hay información disponible para {pathParts[3].split('-')[1]} </p>
      ) : (
        <PopulationChart data={populationData} />
      )}
    </div>
  );
};

export default CountryInfoPage;
