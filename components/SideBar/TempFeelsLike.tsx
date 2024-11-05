import { Line } from "react-chartjs-2";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { ArrowDown, ArrowUp, CloudSnow, Sun, Wind } from "react-feather";
type propType = {
  value: number;
  tooltipText: string;
};

const TempFeelsLike = ({ value, tooltipText }: propType) => {
  return (
    <div className="py-3 px-3 relative h-full">
      <div className="px-4 rounded-3xl bg-white/10 w-24 h-10 abesolute flex gap-1 items-center justify-center text-sm">
        <span className="flex gap-1 items-center">
          {value > 5 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          {value}
        </span>
        {value > 13 ? (
          <Sun size={20} />
        ) : value < 5 ? (
          <CloudSnow size={18} />
        ) : (
          <Wind size={18} />
        )}
      </div>
      <div className="w-full mb-3">
        <ExponentialChart targetValue={value} tooltipText={tooltipText} />
      </div>
    </div>
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ExponentialChart = ({
  targetValue,
  tooltipText,
}: {
  targetValue: number;
  tooltipText: string;
}) => {
  const totalPoints = 61;
  const range = 60;

  const linearData = Array.from(
    { length: totalPoints },
    (_, i) => i - range / 2
  );

  const targetIndex = linearData.findIndex((value) => value >= targetValue);

  const data = {
    labels: Array.from({ length: totalPoints }, (_, i) => i - range / 2),
    datasets: [
      {
        label: "Temperature Line",
        data: linearData,
        borderColor: (context: { chart: Chart }) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );
          gradient.addColorStop(0, "#52cae3");
          gradient.addColorStop(1, "#f04e5a");
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "Target Dot",
        data: linearData.map((value, index) =>
          index === targetIndex ? value : null
        ),
        backgroundColor: "#ffffff",
        pointRadius: 6,
        showLine: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: -30,
        max: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      customTooltip: {
        tooltipText,
        targetIndex,
      },
    },
  };

  const customTooltipPlugin = {
    id: "customTooltip",
    afterDatasetsDraw(
      chart: Chart,
      args: object,
      pluginOptions: { tooltipText: string; targetIndex: never }
    ) {
      const { ctx } = chart;
      const { tooltipText, targetIndex } = pluginOptions;

      const dataset = chart.getDatasetMeta(1);
      const dataPoint = dataset?.data[targetIndex];

      if (dataPoint && ctx) {
        ctx.save();
        ctx.font = "12px Poppins";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(tooltipText, dataPoint.x - 5, dataPoint.y - 15);
        ctx.restore();
      }
    },
  };

  return <Line data={data} options={options} plugins={[customTooltipPlugin]} />;
};

export default TempFeelsLike;
