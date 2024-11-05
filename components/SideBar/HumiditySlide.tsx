import { Line } from "react-chartjs-2";
import React from "react";
import Image from "next/image";
import icon from "@/lotties/humidity.gif";
import { ArrowDown, ArrowUp } from "react-feather";

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
type propType = {
  value: number;
  tooltipText: string;
};

const HumiditySlide = ({ value, tooltipText }: propType) => {
  return (
    <div className="py-3 px-3 relative h-full">
      <div className="px-4 rounded-3xl bg-white/10 w-24 h-10 abesolute flex gap-1 items-center justify-center text-sm">
        <span className="flex gap-1 items-center">
          {value > 50 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          {value}
          {"%"}
        </span>
        <Image
          src={icon}
          alt="humidity"
          width={0}
          height={0}
          className="w-6 h-6"
        />
      </div>
      <div className="w-full mb-3">
        <ExponentialChart targetPercentage={value} tooltipText={tooltipText} />
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
  targetPercentage,
  tooltipText,
}: {
  targetPercentage: number;
  tooltipText: string;
}) => {
  const totalPoints = 91;
  const exponentialData = Array.from({ length: totalPoints }, (_, i) =>
    Math.min(Math.exp(i / 20), 90)
  );
  const targetIndex = exponentialData.findIndex(
    (value) => value >= targetPercentage
  );
  const data = {
    labels: Array.from({ length: totalPoints }, (_, i) => i),
    datasets: [
      {
        label: "Exponential Growth",
        data: exponentialData,
        borderColor: "#52cae3",
        pointRadius: 0,
      },
      {
        label: "Target Dot",
        data: exponentialData.map((value, index) =>
          index === targetIndex ? value : null
        ),
        backgroundColor: "#52cae3",
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
        // Custom plugin for always showing tooltip text
        tooltipText,
        targetIndex,
      },
    },
  };
  const customTooltipPlugin = {
    id: "customTooltip",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterDatasetsDraw(
      chart: Chart,
      args: object,
      pluginOptions: { tooltipText: string; targetIndex: never }
    ) {
      const { ctx } = chart;
      const { tooltipText, targetIndex } = pluginOptions;

      const dataset = chart.getDatasetMeta(1); // Get the dataset for the target dot
      const dataPoint = dataset?.data[targetIndex]; // Get the target dot element

      if (dataPoint && ctx) {
        ctx.save();
        ctx.font = "12px poppins";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";

        // Draw text above the target dot
        ctx.fillText(tooltipText, dataPoint.x - 5, dataPoint.y - 15);
        ctx.restore();
      }
    },
  };
  return <Line data={data} options={options} plugins={[customTooltipPlugin]} />;
};

export default HumiditySlide;
