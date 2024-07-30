import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useRef } from 'react';

interface BarChartProps {
  data: { label: string; value: number }[];
}

// スケールとエレメントを登録
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const BarChart: React.FC<BarChartProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current!.getContext('2d');
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: props.data.map((d) => d.label),
        datasets: [
          {
            label: 'Monthly Sales',
            data: props.data.map((d) => d.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // クリーンアップ関数を返して、コンポーネントがアンマウントされる際にチャートを破棄します
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};
