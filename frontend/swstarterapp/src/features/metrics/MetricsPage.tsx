"use client";

import { Layout } from "@/components/templates/Layout";
import { getMetrics } from "@/services/metricsService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PercentileChart } from "./components/PercentileChart";
import { StatCard } from "./components/StatCard";
import { StatusCodeChart } from "./components/StatusCodeChart";

export const MetricsPage: React.FC = () => {
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["metrics"],
    queryFn: getMetrics,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !metrics?.data) {
    return (
      <Layout>
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative h-fit"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Failed to load metrics data.</span>
        </div>
      </Layout>
    );
  }

  const { data } = metrics;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">System Metrics</h1>
          <span className="text-sm text-gray-500">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Avg Response Time"
            value={`${data.average_response_time_ms} ms`}
          />
          <StatCard
            title="Most Popular Hour"
            value={`${data.most_popular_hour}:00`}
            subtext={`${data.most_popular_hour_count} requests`}
          />
          <StatCard
            title="Total Paths Tracked"
            value={Object.keys(data.status_codes_by_path).length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PercentileChart data={data.response_time_percentiles} />
          <StatusCodeChart data={data.status_codes_by_path} />
        </div>
      </div>
    </Layout>
  );
};
