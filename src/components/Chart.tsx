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
    label: string
    score: number
  }[]
  isSuperior: boolean
  isSuperiorTotal: boolean
}

type LegendPosition = "top" | "left" | "bottom" | "right";

const Chart:React.FC<ChartProps> = ({ area, scores, isSuperior, isSuperiorTotal }) => {
  const areasData = areas.find((a) => a.id === area);

  if (!areasData) {
    return <div>Invalid area selected</div>;
  }

  const config = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        grid: {
          color: 'gray',
          lineWidth: 1,
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
          precision: isSuperior ? 2 : 0,
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
            size: 18,
          },
          color: "gray",
          boxWidth: 20,
        },
      },
    },
  };

  const data = {
    labels: isSuperiorTotal ? scores.map((s) => (s.label)) : areasData.topics.map((topic) => (topic.label)),
    datasets: [
      {
        label: ' Vurdering',
        data: scores.map(topic => topic.score),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };
  return <PolarArea data={data} options={config} />;
}


export default Chart
