import React from "react";

interface StatusCodeChartProps {
  data: Record<string, Record<string, number>>;
}

export const StatusCodeChart: React.FC<StatusCodeChartProps> = ({ data }) => {
  const paths = Object.keys(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Status Codes by Path
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Path
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                200
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                400
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                500
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Other
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paths.map((path) => {
              const codes = data[path];
              const count200 = codes["200"] || 0;
              const count400 = Object.keys(codes)
                .filter((c) => c.startsWith("4"))
                .reduce((acc, c) => acc + codes[c], 0);
              const count500 = Object.keys(codes)
                .filter((c) => c.startsWith("5"))
                .reduce((acc, c) => acc + codes[c], 0);
              const countOther = Object.keys(codes)
                .filter(
                  (c) =>
                    !c.startsWith("2") &&
                    !c.startsWith("4") &&
                    !c.startsWith("5")
                )
                .reduce((acc, c) => acc + codes[c], 0);

              return (
                <tr key={path}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {count200}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                    {count400}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {count500}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {countOther}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
