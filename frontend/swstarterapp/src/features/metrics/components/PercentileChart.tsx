import { Percentiles } from "@/types/metrics";
import React from "react";

interface PercentileChartProps {
  data: Record<string, Percentiles>;
}

export const PercentileChart: React.FC<PercentileChartProps> = ({ data }) => {
  const paths = Object.keys(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Response Time Percentiles (ms)
      </h3>
      <div className="space-y-6">
        {paths.map((path) => {
          const p95 = data[path].p95;
          // Calculate width relative to a max value (e.g., 5000ms or max in dataset)
          // For simplicity, let's cap at 5000ms for 100% width or use a dynamic max
          const maxVal = 5000;
          const width = Math.min((p95 / maxVal) * 100, 100);

          return (
            <div key={path}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{path}</span>
                <span className="text-gray-500">p95: {p95}ms</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${width}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>p50: {data[path].p50}ms</span>
                <span>p99: {data[path].p99}ms</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
