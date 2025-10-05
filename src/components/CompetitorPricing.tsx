import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Eye,
} from "lucide-react";

const CompetitorPricing: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState("all");

  const competitorData = [
    {
      product: "Premium Biscuits",
      ourPrice: 125,
      competitors: [
        { name: "Competitor A", price: 128, trend: 2.3 },
        { name: "Competitor B", price: 132, trend: -1.5 },
        { name: "Competitor C", price: 118, trend: 5.2 },
      ],
      marketPosition: "competitive",
      priceIndex: 97.8,
    },
    {
      product: "Chocolate Bars",
      ourPrice: 85,
      competitors: [
        { name: "Competitor A", price: 88, trend: 1.8 },
        { name: "Competitor B", price: 82, trend: -2.1 },
        { name: "Competitor C", price: 90, trend: 3.4 },
      ],
      marketPosition: "competitive",
      priceIndex: 102.3,
    },
    {
      product: "Energy Drinks",
      ourPrice: 65,
      competitors: [
        { name: "Competitor A", price: 72, trend: 0.8 },
        { name: "Competitor B", price: 68, trend: 1.2 },
        { name: "Competitor C", price: 75, trend: -0.5 },
      ],
      marketPosition: "below",
      priceIndex: 89.7,
    },
    {
      product: "Instant Noodles",
      ourPrice: 45,
      competitors: [
        { name: "Competitor A", price: 42, trend: -1.2 },
        { name: "Competitor B", price: 43, trend: 2.1 },
        { name: "Competitor C", price: 41, trend: 0.8 },
      ],
      marketPosition: "above",
      priceIndex: 107.1,
    },
  ];

  const priceAlerts = [
    {
      product: "Energy Drinks",
      type: "opportunity",
      message: "Competitor A increased price by 8%",
      impact: "positive",
    },
    {
      product: "Chocolate Bars",
      type: "threat",
      message: "New competitor entered with 15% lower price",
      impact: "negative",
    },
    {
      product: "Premium Biscuits",
      type: "monitor",
      message: "Competitor B running promotion",
      impact: "neutral",
    },
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case "above":
        return "bg-red-100 text-red-600";
      case "below":
        return "bg-blue-100 text-blue-600";
      case "competitive":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 border-green-200 text-green-800";
      case "threat":
        return "bg-red-100 border-red-200 text-red-800";
      case "monitor":
        return "bg-yellow-100 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  const products = ["all", ...competitorData.map((p) => p.product)];

  const filteredData =
    selectedProduct === "all"
      ? competitorData
      : competitorData.filter((p) => p.product === selectedProduct);

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">15</p>
              <p className="text-gray-600 text-sm">Competitors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">99.2</p>
              <p className="text-gray-600 text-sm">Price Index</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">7</p>
              <p className="text-gray-600 text-sm">Opportunities</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">3</p>
              <p className="text-gray-600 text-sm">Price Alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Price Comparison */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2A2E33]">
                Competitive Pricing Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Compare prices across competitors
              </p>
            </div>
            <Eye className="w-5 h-5 text-[#F57C00]" />
          </div>

          {/* Product Filter */}
          <div className="mb-6">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
            >
              {products.map((product) => (
                <option key={product} value={product}>
                  {product === "all" ? "All Products" : product}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            {filteredData.map((product, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#2A2E33]">
                    {product.product}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(
                        product.marketPosition
                      )}`}
                    >
                      {product.marketPosition}
                    </span>
                    <span className="text-sm text-gray-600">
                      Index: {product.priceIndex}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Our Price */}
                  <div className="flex items-center justify-between p-3 bg-[#F6F9FF] rounded-lg border-l-4 border-[#F57C00]">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#F57C00] rounded-full"></div>
                      <span className="font-medium text-[#2A2E33]">
                        Our Price
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#2A2E33]">
                      ₹{product.ourPrice}
                    </span>
                  </div>

                  {/* Competitor Prices */}
                  {product.competitors.map((competitor, compIndex) => (
                    <div
                      key={compIndex}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span className="font-medium text-gray-700">
                          {competitor.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center space-x-1 ${
                            competitor.trend > 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {competitor.trend > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {competitor.trend > 0 ? "+" : ""}
                            {competitor.trend}%
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-700">
                          ₹{competitor.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-lg font-semibold text-[#2A2E33]">
              Price Alerts
            </h3>
          </div>

          <div className="space-y-4">
            {priceAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{alert.product}</span>
                  <span className="text-xs uppercase font-bold tracking-wide">
                    {alert.type}
                  </span>
                </div>
                <p className="text-sm mb-3">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      alert.impact === "positive"
                        ? "text-green-600"
                        : alert.impact === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {alert.impact === "positive"
                      ? "↑ Positive"
                      : alert.impact === "negative"
                      ? "↓ Negative"
                      : "→ Neutral"}
                  </span>
                  <button className="text-xs text-[#F57C00] hover:text-[#E65100] font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Market Position Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#2A2E33] mb-6">
          Market Position Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">65%</div>
            <div className="text-sm text-green-700 font-medium">
              Competitive Position
            </div>
            <div className="text-xs text-green-600 mt-1">
              Products priced within 5% of market average
            </div>
          </div>

          <div className="text-center p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">20%</div>
            <div className="text-sm text-blue-700 font-medium">
              Below Market
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Products priced below competition
            </div>
          </div>

          <div className="text-center p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-2">15%</div>
            <div className="text-sm text-red-700 font-medium">Above Market</div>
            <div className="text-xs text-red-600 mt-1">
              Products priced above competition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorPricing;
