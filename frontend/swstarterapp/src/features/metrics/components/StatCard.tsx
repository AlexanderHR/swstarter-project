import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </h3>
    <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
    {subtext && <div className="mt-1 text-sm text-gray-400">{subtext}</div>}
  </div>
);
