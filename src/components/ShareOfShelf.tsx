import React, { useState } from "react";
import { PieChart, TrendingUp, Package, Target, BarChart3 } from "lucide-react";

const ShareOfShelf: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const shelfData = [
    {
      category: "Snacks",
      ourShare: 28.5,
      competitor1: 22.3,
      competitor2: 18.7,
      others: 30.5,
      trend: 5.2,
    },
    {
      category: "Beverages",
      ourShare: 35.2,
      competitor1: 25.8,
      competitor2: 15.4,
      others: 23.6,
      trend: -2.1,
    },
    {
      category: "Confectionery",
      ourShare: 18.9,
      competitor1: 31.2,
      competitor2: 26.1,
      others: 23.8,
      trend: 8.7,
    },
    {
      category: "Convenience",
      ourShare: 42.1,
      competitor1: 18.7,
      competitor2: 16.3,
      others: 22.9,
      trend: 12.3,
    },
  ];

  const storePerformance = [
    {
      store: "Super Mart Downtown",
      ourShare: 32.5,
      totalShelf: 120,
      products: 15,
      performance: "excellent",
    },
    {
      store: "Quick Shop Plaza",
      ourShare: 28.7,
      totalShelf: 95,
      products: 12,
      performance: "good",
    },
    {
      store: "Metro Grocery",
      ourShare: 18.3,
      totalShelf: 150,
      products: 18,
      performance: "needs-improvement",
    },
    {
      store: "Family Foods",
      ourShare: 45.2,
      totalShelf: 80,
      products: 10,
      performance: "excellent",
    },
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-100 text-green-600";
      case "good":
        return "bg-blue-100 text-blue-600";
      case "needs-improvement":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const categories = [
    "all",
    "Snacks",
    "Beverages",
    "Confectionery",
    "Convenience",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">31.2%</p>
              <p className="text-gray-600 text-sm">Avg Share</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">+6.1%</p>
              <p className="text-gray-600 text-sm">Growth</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">1,245</p>
              <p className="text-gray-600 text-sm">Total Facings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">87%</p>
              <p className="text-gray-600 text-sm">Target Achievement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2A2E33]">
            Share of Shelf Analysis
          </h3>
          <BarChart3 className="w-5 h-5 text-[#F57C00]" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>

        {/* Share Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shelfData
            .filter(
              (item) =>
                selectedCategory === "all" || item.category === selectedCategory
            )
            .map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#2A2E33]">
                    {item.category}
                  </h4>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      item.trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${
                        item.trend < 0 ? "rotate-180" : ""
                      }`}
                    />
                    <span className="font-medium">
                      {item.trend > 0 ? "+" : ""}
                      {item.trend}%
                    </span>
                  </div>
                </div>

                {/* Visual Share Representation */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-[#2A2E33] w-20">
                      Our Share
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                      <div
                        className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.ourShare}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#2A2E33] w-12">
                      {item.ourShare}%
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 w-20">
                      Comp. A
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                      <div
                        className="bg-red-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.competitor1}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {item.competitor1}%
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 w-20">
                      Comp. B
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                      <div
                        className="bg-blue-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.competitor2}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {item.competitor2}%
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-20">
                      Others
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                      <div
                        className="bg-gray-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.others}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {item.others}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Store Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#2A2E33]">
            Store Performance
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Our Share
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Shelf Space
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {storePerformance.map((store, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#2A2E33]">
                    {store.store}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] h-2 rounded-full"
                          style={{ width: `${(store.ourShare / 50) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#2A2E33]">
                        {store.ourShare}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {store.totalShelf} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-[#2A2E33] font-medium">
                      {store.products}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPerformanceColor(
                        store.performance
                      )}`}
                    >
                      {store.performance.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Optimize
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

export default ShareOfShelf;
