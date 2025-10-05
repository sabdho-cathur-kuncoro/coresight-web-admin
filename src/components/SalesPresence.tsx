import React, { useState } from "react";
import {
  Target,
  MapPin,
  Users,
  TrendingUp,
  Eye,
  CheckCircle,
} from "lucide-react";

const SalesPresence: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const presenceData = [
    {
      region: "North",
      totalStores: 128,
      activeStores: 115,
      coverage: 89.8,
      salesReps: 4,
      performance: 92.3,
    },
    {
      region: "Central",
      totalStores: 97,
      activeStores: 78,
      coverage: 80.4,
      salesReps: 3,
      performance: 78.1,
    },
    {
      region: "South",
      totalStores: 117,
      activeStores: 102,
      coverage: 87.2,
      salesReps: 4,
      performance: 85.7,
    },
    {
      region: "East",
      totalStores: 89,
      activeStores: 71,
      coverage: 79.8,
      salesReps: 2,
      performance: 76.4,
    },
    {
      region: "West",
      totalStores: 134,
      activeStores: 123,
      coverage: 91.8,
      salesReps: 5,
      performance: 94.2,
    },
  ];

  const salesTeam = [
    {
      name: "John Smith",
      region: "North",
      stores: 32,
      visits: 145,
      conversion: 87.2,
      rating: 4.8,
    },
    {
      name: "Sarah Johnson",
      region: "North",
      stores: 28,
      visits: 132,
      conversion: 82.1,
      rating: 4.6,
    },
    {
      name: "Mike Wilson",
      region: "Central",
      stores: 35,
      visits: 158,
      conversion: 91.3,
      rating: 4.9,
    },
    {
      name: "Lisa Brown",
      region: "South",
      stores: 29,
      visits: 127,
      conversion: 85.7,
      rating: 4.7,
    },
    {
      name: "David Lee",
      region: "West",
      stores: 41,
      visits: 198,
      conversion: 93.1,
      rating: 4.9,
    },
  ];

  const activitiesFeed = [
    {
      id: 1,
      rep: "John Smith",
      activity: "Store visit completed",
      store: "Super Mart Downtown",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      rep: "Sarah Johnson",
      activity: "New product placement",
      store: "Quick Shop Plaza",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      rep: "Mike Wilson",
      activity: "Competitor analysis",
      store: "Metro Grocery",
      time: "6 hours ago",
      status: "in-progress",
    },
    {
      id: 4,
      rep: "Lisa Brown",
      activity: "Shelf audit scheduled",
      store: "Family Foods",
      time: "8 hours ago",
      status: "scheduled",
    },
  ];

  const regions = ["all", ...presenceData.map((p) => p.region)];

  const filteredData =
    selectedRegion === "all"
      ? presenceData
      : presenceData.filter((p) => p.region === selectedRegion);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600";
    if (performance >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "in-progress":
        return "bg-blue-100 text-blue-600";
      case "scheduled":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">565</p>
              <p className="text-gray-600 text-sm">Total Stores</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">489</p>
              <p className="text-gray-600 text-sm">Active Stores</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">18</p>
              <p className="text-gray-600 text-sm">Sales Reps</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">86.6%</p>
              <p className="text-gray-600 text-sm">Coverage Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Regional Coverage */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#2A2E33]">
                Regional Sales Presence
              </h3>
              <p className="text-gray-600 text-sm">
                Coverage and performance by region
              </p>
            </div>
            <Eye className="w-5 h-5 text-[#F57C00]" />
          </div>

          {/* Region Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    selectedRegion === region
                      ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {region === "all" ? "All Regions" : region}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredData.map((region, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-[#2A2E33] text-lg">
                      {region.region} Region
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {region.salesReps} sales representatives
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${getPerformanceColor(
                        region.performance
                      )}`}
                    >
                      {region.performance}%
                    </div>
                    <p className="text-gray-600 text-sm">Performance</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-[#2A2E33]">
                      {region.totalStores}
                    </div>
                    <div className="text-gray-600 text-xs">Total Stores</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {region.activeStores}
                    </div>
                    <div className="text-gray-600 text-xs">Active Stores</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {region.coverage}%
                    </div>
                    <div className="text-gray-600 text-xs">Coverage</div>
                  </div>
                </div>

                {/* Coverage Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Store Coverage</span>
                    <span className="font-medium text-[#2A2E33]">
                      {region.coverage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${region.coverage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-lg font-semibold text-[#2A2E33]">
              Recent Activities
            </h3>
          </div>

          <div className="space-y-4">
            {activitiesFeed.map((activity) => (
              <div
                key={activity.id}
                className="border-l-4 border-[#F57C00] pl-4 pb-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[#2A2E33] text-sm">
                    {activity.rep}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  {activity.activity}
                </p>
                <p className="text-xs text-gray-500 mb-2">{activity.store}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
            View All Activities
          </button>
        </div>
      </div>

      {/* Sales Team Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#2A2E33]">
            Sales Team Performance
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Rep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesTeam.map((rep, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {rep.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="font-medium text-[#2A2E33]">
                        {rep.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {rep.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-[#2A2E33] font-medium">
                      {rep.stores}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-[#2A2E33] font-medium">
                      {rep.visits}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] h-2 rounded-full"
                          style={{ width: `${rep.conversion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#2A2E33]">
                        {rep.conversion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < Math.floor(rep.rating)
                                ? "bg-[#F57C00]"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {rep.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#F57C00] hover:text-[#E65100] text-sm font-medium transition-colors">
                      View Profile
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

export default SalesPresence;
