import React, { useState } from "react";
import { useToast } from "../hooks/useToast";
import {
  Package,
  AlertTriangle,
  TrendingDown,
  Search,
  Filter,
} from "lucide-react";

const StockTracking: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { success, warning } = useToast();

  const stockData = [
    {
      id: 1,
      product: "Premium Biscuits",
      category: "Snacks",
      currentStock: 145,
      minStock: 200,
      status: "low",
      stores: 12,
      trend: -15,
    },
    {
      id: 2,
      product: "Chocolate Bars",
      category: "Confectionery",
      currentStock: 89,
      minStock: 150,
      status: "critical",
      stores: 8,
      trend: -25,
    },
    {
      id: 3,
      product: "Energy Drinks",
      category: "Beverages",
      currentStock: 67,
      minStock: 100,
      status: "critical",
      stores: 15,
      trend: -30,
    },
    {
      id: 4,
      product: "Instant Noodles",
      category: "Convenience",
      currentStock: 234,
      minStock: 200,
      status: "good",
      stores: 18,
      trend: 12,
    },
    {
      id: 5,
      product: "Fruit Juices",
      category: "Beverages",
      currentStock: 178,
      minStock: 180,
      status: "low",
      stores: 14,
      trend: -8,
    },
    {
      id: 6,
      product: "Cookies Pack",
      category: "Snacks",
      currentStock: 456,
      minStock: 300,
      status: "good",
      stores: 22,
      trend: 18,
    },
  ];

  const categories = [
    "all",
    "Snacks",
    "Beverages",
    "Confectionery",
    "Convenience",
  ];

  const filteredData = stockData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.product
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-600";
      case "low":
        return "bg-yellow-100 text-yellow-600";
      case "good":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStockLevel = (current: number, min: number) => {
    return Math.min((current / min) * 100, 100);
  };

  const handleStockAlert = (product: string, status: string) => {
    if (status === "critical") {
      warning(
        "Critical Stock Alert",
        `${product} requires immediate restocking`,
        {
          action: {
            label: "Reorder Now",
            onClick: () =>
              success(
                "Reorder Initiated",
                `Reorder request sent for ${product}`
              ),
          },
        }
      );
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">23</p>
              <p className="text-gray-600 text-sm">Critical Stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">41</p>
              <p className="text-gray-600 text-sm">Low Stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">156</p>
              <p className="text-gray-600 text-sm">Total Products</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">87%</p>
              <p className="text-gray-600 text-sm">Avg Availability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
              />
            </div>
            <Filter className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#2A2E33]">
            Stock Levels by Product
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stores Affected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-[#2A2E33]">
                      {item.product}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[#2A2E33] font-medium">
                      {item.currentStock}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Min: {item.minStock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          item.status === "critical"
                            ? "bg-red-500"
                            : item.status === "low"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${getStockLevel(
                            item.currentStock,
                            item.minStock
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {getStockLevel(item.currentStock, item.minStock).toFixed(
                        0
                      )}
                      %
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        handleStockAlert(item.product, item.status)
                      }
                      className="text-[#2A2E33] font-medium hover:text-[#F57C00] transition-colors"
                    >
                      {item.stores}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center space-x-1 ${
                        item.trend > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span className="font-medium">
                        {item.trend > 0 ? "+" : ""}
                        {item.trend}%
                      </span>
                    </div>
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

export default StockTracking;
