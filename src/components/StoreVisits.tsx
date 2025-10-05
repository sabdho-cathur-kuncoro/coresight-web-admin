/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Plus,
  CreditCard as Edit,
} from "lucide-react";
import { useModal } from "../hooks/useModal";
import { useToast } from "../hooks/useToast";
import StoreVisitForm from "./forms/StoreVisitForm";

const StoreVisits: React.FC = () => {
  const [selectedView, setSelectedView] = useState("scheduled");
  const {
    isOpen: isFormOpen,
    openModal: openForm,
    closeModal: closeForm,
  } = useModal();
  const { success } = useToast();
  const [formMode, setFormMode] = useState<"schedule" | "complete" | "edit">(
    "schedule"
  );
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  const visitData = [
    {
      id: 1,
      storeName: "Super Mart Downtown",
      address: "123 Main St, City Center",
      salesRep: "John Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "completed",
      notes: "Stock replenished, new promotion discussed",
      rating: 4.5,
    },
    {
      id: 2,
      storeName: "Quick Shop Plaza",
      address: "456 Oak Ave, North District",
      salesRep: "Sarah Johnson",
      date: "2024-01-16",
      time: "2:30 PM",
      status: "scheduled",
      notes: "Initial product placement meeting",
      rating: null,
    },
    {
      id: 3,
      storeName: "Metro Grocery",
      address: "789 Pine St, East Side",
      salesRep: "Mike Wilson",
      date: "2024-01-17",
      time: "11:15 AM",
      status: "completed",
      notes: "Competitor analysis completed",
      rating: 5.0,
    },
    {
      id: 4,
      storeName: "Family Foods",
      address: "321 Elm St, West End",
      salesRep: "Lisa Brown",
      date: "2024-01-18",
      time: "3:45 PM",
      status: "pending",
      notes: "Shelf space expansion discussion",
      rating: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "scheduled":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "scheduled":
        return "bg-blue-100 text-blue-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredVisits = visitData.filter((visit) => {
    if (selectedView === "all") return true;
    return visit.status === selectedView;
  });

  const handleScheduleVisit = () => {
    setFormMode("schedule");
    setSelectedVisit(null);
    openForm();
  };

  const handleCompleteVisit = (visit: any) => {
    setFormMode("complete");
    setSelectedVisit(visit);
    openForm();
  };

  const handleFormSuccess = (mode: string, storeName: string) => {
    if (mode === "schedule") {
      success("Visit Scheduled", `Store visit scheduled for ${storeName}`);
    } else if (mode === "complete") {
      success("Visit Completed", `Visit report submitted for ${storeName}`);
    } else {
      success("Visit Updated", `Visit details updated for ${storeName}`);
    }
  };

  const handleEditVisit = (visit: any) => {
    setFormMode("edit");
    setSelectedVisit(visit);
    openForm();
  };
  return (
    <div className="p-6 space-y-6 relative">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">156</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">23</p>
              <p className="text-gray-600 text-sm">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">342</p>
              <p className="text-gray-600 text-sm">Total Stores</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2A2E33]">12</p>
              <p className="text-gray-600 text-sm">Sales Reps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2A2E33]">Store Visits</h3>
          <button
            onClick={handleScheduleVisit}
            className="bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Visit</span>
          </button>
        </div>

        <div className="flex space-x-2 mb-6">
          {["all", "scheduled", "completed", "pending"].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                selectedView === view
                  ? "bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {view} (
              {view === "all"
                ? visitData.length
                : visitData.filter((v) => v.status === view).length}
              )
            </button>
          ))}
        </div>

        {/* Visit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVisits.map((visit) => (
            <div
              key={visit.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#F57C00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2A2E33]">
                      {visit.storeName}
                    </h4>
                    <p className="text-gray-600 text-sm">{visit.address}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    visit.status
                  )}`}
                >
                  {visit.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Sales Rep: {visit.salesRep}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {visit.date} at {visit.time}
                  </span>
                </div>

                {visit.rating && (
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < Math.floor(visit.rating!)
                              ? "bg-[#F57C00]"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      Rating: {visit.rating}/5
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-600 mb-3">{visit.notes}</p>
                <div className="flex items-center justify-between">
                  {getStatusIcon(visit.status)}
                  <div className="flex items-center space-x-2">
                    {visit.status === "scheduled" && (
                      <button
                        onClick={() => handleCompleteVisit(visit)}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleEditVisit(visit)}
                      className="text-[#F57C00] hover:text-[#E65100] text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Calendar Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#2A2E33] mb-4">
          This Week's Schedule
        </h3>

        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {day}
                </div>
                <div className="space-y-1">
                  {index < 5 && (
                    <div className="bg-[#F57C00] bg-opacity-10 border border-[#F57C00] border-opacity-30 rounded p-2 text-xs">
                      <div className="font-medium text-[#F57C00]">
                        {Math.floor(Math.random() * 3) + 1} visits
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Store Visit Form Modal */}
      <StoreVisitForm
        isOpen={isFormOpen}
        onClose={closeForm}
        visitData={selectedVisit}
        mode={formMode}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default StoreVisits;
