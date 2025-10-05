import React, { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import Chart from "./common/Chart";

const PricingAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("3M");

  const pricingData = [
    { month: "Jan", value: 245 },
    { month: "Feb", value: 238 },
    { month: "Mar", value: 252 },
    { month: "Apr", value: 265 },
    { month: "May", value: 258 },
    { month: "Jun", value: 275 },
  ];

  const products = [
    {
      name: "Premium Biscuits",
      currentPrice: 125,
      suggestedPrice: 135,
      competitor: 128,
      margin: 34.2,
      trend: 8.5,
    },
    {
      name: "Chocolate Bars",
      currentPrice: 85,
      suggestedPrice: 90,
      competitor: 88,
      margin: 28.7,
      trend: -2.3,
    },
    {
      name: "Energy Drinks",
      currentPrice: 65,
      suggestedPrice: 70,
      competitor: 72,
      margin: 31.5,
      trend: 12.1,
    },
    {
      name: "Instant Noodles",
      currentPrice: 45,
      suggestedPrice: 48,
      competitor: 46,
      margin: 26.8,
      trend: 5.7,
    },
    {
      name: "Fruit Juices",
      currentPrice: 55,
      suggestedPrice: 58,
      competitor: 59,
      margin: 29.1,
      trend: -1.8,
    },
  ];

  const periods = ["1M", "3M", "6M", "1Y"];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">₹275</p>
              <p className="text-gray-600 text-sm">Avg Price</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">29.8%</p>
              <p className="text-gray-600 text-sm">Avg Margin</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">+5.2%</p>
              <p className="text-gray-600 text-sm">Price Change</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">12</p>
              <p className="text-gray-600 text-sm">Price Alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Price Trend Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2A2E33]">
                Price Trends
              </h3>
              <p className="text-gray-600 text-sm">
                Average product pricing over time
              </p>
            </div>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <Chart data={pricingData} type="line" height={300} />
        </div>

        {/* Pricing Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-[#2A2E33] mb-4">
            Pricing Recommendations
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium text-sm">
                  Increase Price
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Premium Biscuits</p>
              <p className="text-xs text-gray-600">
                Market can support 8% increase
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-600 font-medium text-sm">
                  Monitor Closely
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Energy Drinks</p>
              <p className="text-xs text-gray-600">Below competitor pricing</p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-red-600 font-medium text-sm">
                  Consider Reduction
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Chocolate Bars</p>
              <p className="text-xs text-gray-600">Above market average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Pricing Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#2A2E33]">
            Product Pricing Analysis
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suggested Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#2A2E33]">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#2A2E33] font-medium">
                    ₹{product.currentPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        product.suggestedPrice > product.currentPrice
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹{product.suggestedPrice}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    ₹{product.competitor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#2A2E33]">
                      {product.margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center space-x-1 ${
                        product.trend > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.trend > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {product.trend > 0 ? "+" : ""}
                        {product.trend}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingAnalysis;
