import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PopulationCount {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data: PopulationCount[];
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
  const populationChartData = {
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: 'Population',
        data: data.map((data) => data.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Population',
          font: {
            size: 14,
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100000000,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return <Line data={populationChartData} options={options} />;
};
