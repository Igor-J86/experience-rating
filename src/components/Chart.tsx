import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { areas, colors } from '../utils/globals';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

type ChartProps = {
  area: string
  scores: {
    name: string
    score: number
  }[]
}
type LegendPosition = "top" | "left" | "bottom" | "right";

const Chart:React.FC<ChartProps> = ({ area, scores }) => {
  const areasData = areas[area as keyof typeof areas]; 

  if (!areasData) {
    return <div>Invalid area selected</div>;
  }
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: 'gray', // Grid line color (background lines)
          lineWidth: 1, // Grid line width
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          },
          color: "gray"
        },
        min: 0,
        max: 5,
        ticks: {
          precision: 0,
          font: {
            size: 18
          },
          color: 'black'
        },
      }
    },
    plugins: {
      legend: {
        position: "right" as LegendPosition,
        labels: {
          font: {
            size: 18, // Font size for the legend labels
          },
          color: "gray",
          boxWidth: 20, // Adjust the size of the color swatches (default is 40)
        },
      },
    },
  };

  const data = {
    labels: areasData.topics.map((topic) => (topic.label)),
    datasets: [
      {
        label: ' Vurdering',
        data: scores.map(topic => topic.score),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };
  return <PolarArea data={data} options={config} />;
}


export default Chart
