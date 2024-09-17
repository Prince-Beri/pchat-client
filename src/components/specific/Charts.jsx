import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { blue, blueLight, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';

const labels = getLast7Days();

ChartJS.register(
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        }
    }
}
const doughnutChartOptions = {
    responsive: true,
    plugins: {
        labels: {
            display: false,
        },

    },
    cutout: 120
}

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
        {
            data: value,
            label: 'Messages',
            fill: true,
            backgroundColor: purpleLight,
            borderColor: purple

        }
    ]

  }
  return (
    <Line data={data} options={lineChartOptions}/>
  )
}


const DoughnutChart = ({ value = [], labels = []}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [purpleLight, blueLight],
                borderColor: [purple, blue],
                offset: 10,

            }
        ]

    }
    return (    
        <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutChartOptions}/>
    )
}

export { DoughnutChart, LineChart };
