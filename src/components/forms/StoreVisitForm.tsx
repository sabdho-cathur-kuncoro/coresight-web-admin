/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  //   User,
  Package,
  DollarSign,
  //   Camera,
  Star,
  Save,
  X,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";

interface StoreVisitFormProps {
  isOpen: boolean;
  onClose: () => void;
  visitData?: any;
  mode: "schedule" | "complete" | "edit";
  onSuccess?: (mode: string, storeName: string) => void;
}

const StoreVisitForm: React.FC<StoreVisitFormProps> = ({
  isOpen,
  onClose,
  visitData,
  mode,
  onSuccess,
}) => {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Visit Info
    storeName: visitData?.storeName || "",
    storeAddress: visitData?.address || "",
    storeManager: visitData?.manager || "",
    salesRep: visitData?.salesRep || "",
    visitDate: visitData?.date || "",
    visitTime: visitData?.time || "",
    visitType: visitData?.type || "routine",

    // Visit Objectives
    objectives: visitData?.objectives || [],

    // Stock Assessment
    stockLevels: visitData?.stockLevels || [
      { product: "Premium Biscuits", current: "", target: "", status: "good" },
      { product: "Chocolate Bars", current: "", target: "", status: "good" },
      { product: "Energy Drinks", current: "", target: "", status: "good" },
    ],

    // Pricing Information
    pricingData: visitData?.pricingData || [
      {
        product: "Premium Biscuits",
        ourPrice: "",
        competitorPrice: "",
        recommended: "",
      },
      {
        product: "Chocolate Bars",
        ourPrice: "",
        competitorPrice: "",
        recommended: "",
      },
    ],

    // Share of Shelf
    shelfData: visitData?.shelfData || {
      totalShelfSpace: "",
      ourShelfSpace: "",
      competitorShelfSpace: "",
      shelfPosition: "eye-level",
      facings: "",
    },

    // Visit Completion (for complete mode)
    visitNotes: visitData?.notes || "",
    storeRating: visitData?.rating || 5,
    issuesFound: visitData?.issues || [],
    actionItems: visitData?.actionItems || [],
    photos: visitData?.photos || [],

    // Follow-up
    followUpRequired: visitData?.followUpRequired || false,
    followUpDate: visitData?.followUpDate || "",
    followUpNotes: visitData?.followUpNotes || "",
  });

  const visitTypes = [
    { value: "routine", label: "Routine Visit" },
    { value: "audit", label: "Store Audit" },
    { value: "promotion", label: "Promotion Setup" },
    { value: "complaint", label: "Complaint Resolution" },
    { value: "new-product", label: "New Product Launch" },
  ];

  const objectives = [
    "Stock Level Assessment",
    "Price Verification",
    "Shelf Space Audit",
    "Competitor Analysis",
    "Promotion Setup",
    "Relationship Building",
    "Issue Resolution",
    "New Product Placement",
  ];

  const commonIssues = [
    "Out of Stock",
    "Incorrect Pricing",
    "Poor Shelf Position",
    "Damaged Products",
    "Competitor Promotion",
    "Store Manager Unavailable",
    "Shelf Space Reduced",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call success callback if provided
      onSuccess?.(mode, formData.storeName);

      onClose();
    } catch (err: any) {
      error("Error", "Failed to save visit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActionItem = () => {
    setFormData({
      ...formData,
      actionItems: [
        ...formData.actionItems,
        { task: "", priority: "medium", dueDate: "" },
      ],
    });
  };

  const removeActionItem = (index: number) => {
    setFormData({
      ...formData,
      actionItems: formData.actionItems.filter((_: any, i: any) => i !== index),
    });
  };

  const getTitle = () => {
    switch (mode) {
      case "schedule":
        return "Schedule Store Visit";
      case "complete":
        return "Complete Store Visit";
      case "edit":
        return "Edit Store Visit";
      default:
        return "Store Visit";
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all">
              {/* Fixed Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-[#2A2E33]">
                  {getTitle()}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form
                  id="store-visit-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#2A2E33] mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-[#F57C00]" />
                      Store Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Name *
                        </label>
                        <input
                          type="text"
                          value={formData.storeName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              storeName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Manager
                        </label>
                        <input
                          type="text"
                          value={formData.storeManager}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              storeManager: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Address *
                        </label>
                        <input
                          type="text"
                          value={formData.storeAddress}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              storeAddress: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#2A2E33] mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-[#F57C00]" />
                      Visit Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sales Rep *
                        </label>
                        <select
                          value={formData.salesRep}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              salesRep: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                          required
                        >
                          <option value="">Select Sales Rep</option>
                          <option value="John Smith">John Smith</option>
                          <option value="Sarah Johnson">Sarah Johnson</option>
                          <option value="Mike Wilson">Mike Wilson</option>
                          <option value="Lisa Brown">Lisa Brown</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visit Date *
                        </label>
                        <input
                          type="date"
                          value={formData.visitDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visitDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visit Time *
                        </label>
                        <input
                          type="time"
                          value={formData.visitTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visitTime: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visit Type
                        </label>
                        <select
                          value={formData.visitType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visitType: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                        >
                          {visitTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Visit Objectives */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visit Objectives
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {objectives.map((objective) => (
                          <label
                            key={objective}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={formData.objectives.includes(objective)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    objectives: [
                                      ...formData.objectives,
                                      objective,
                                    ],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    objectives: formData.objectives.filter(
                                      (o: any) => o !== objective
                                    ),
                                  });
                                }
                              }}
                              className="rounded text-[#F57C00] focus:ring-[#F57C00]"
                            />
                            <span className="text-sm text-gray-700">
                              {objective}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stock Assessment */}
                  {(mode === "complete" || mode === "edit") && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-[#2A2E33] mb-4 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-[#F57C00]" />
                        Stock Assessment
                      </h3>

                      <div className="space-y-3">
                        {formData.stockLevels.map((stock: any, index: any) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-white p-3 rounded-lg"
                          >
                            <div className="font-medium text-[#2A2E33]">
                              {stock.product}
                            </div>
                            <div>
                              <input
                                type="number"
                                placeholder="Current Stock"
                                value={stock.current}
                                onChange={(e) => {
                                  const newStockLevels = [
                                    ...formData.stockLevels,
                                  ];
                                  newStockLevels[index].current =
                                    e.target.value;
                                  setFormData({
                                    ...formData,
                                    stockLevels: newStockLevels,
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                placeholder="Target Stock"
                                value={stock.target}
                                onChange={(e) => {
                                  const newStockLevels = [
                                    ...formData.stockLevels,
                                  ];
                                  newStockLevels[index].target = e.target.value;
                                  setFormData({
                                    ...formData,
                                    stockLevels: newStockLevels,
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <select
                                value={stock.status}
                                onChange={(e) => {
                                  const newStockLevels = [
                                    ...formData.stockLevels,
                                  ];
                                  newStockLevels[index].status = e.target.value;
                                  setFormData({
                                    ...formData,
                                    stockLevels: newStockLevels,
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              >
                                <option value="good">Good</option>
                                <option value="low">Low</option>
                                <option value="critical">Critical</option>
                                <option value="out">Out of Stock</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Information */}
                  {(mode === "complete" || mode === "edit") && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-[#2A2E33] mb-4 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-[#F57C00]" />
                        Pricing Information
                      </h3>

                      <div className="space-y-3">
                        {formData.pricingData.map(
                          (pricing: any, index: any) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-white p-3 rounded-lg"
                            >
                              <div className="font-medium text-[#2A2E33]">
                                {pricing.product}
                              </div>
                              <div>
                                <input
                                  type="number"
                                  placeholder="Our Price"
                                  value={pricing.ourPrice}
                                  onChange={(e) => {
                                    const newPricingData = [
                                      ...formData.pricingData,
                                    ];
                                    newPricingData[index].ourPrice =
                                      e.target.value;
                                    setFormData({
                                      ...formData,
                                      pricingData: newPricingData,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                                />
                              </div>
                              <div>
                                <input
                                  type="number"
                                  placeholder="Competitor Price"
                                  value={pricing.competitorPrice}
                                  onChange={(e) => {
                                    const newPricingData = [
                                      ...formData.pricingData,
                                    ];
                                    newPricingData[index].competitorPrice =
                                      e.target.value;
                                    setFormData({
                                      ...formData,
                                      pricingData: newPricingData,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                                />
                              </div>
                              <div>
                                <input
                                  type="number"
                                  placeholder="Recommended"
                                  value={pricing.recommended}
                                  onChange={(e) => {
                                    const newPricingData = [
                                      ...formData.pricingData,
                                    ];
                                    newPricingData[index].recommended =
                                      e.target.value;
                                    setFormData({
                                      ...formData,
                                      pricingData: newPricingData,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Visit Completion */}
                  {(mode === "complete" || mode === "edit") && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-[#2A2E33] mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-[#F57C00]" />
                        Visit Summary
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visit Notes
                          </label>
                          <textarea
                            value={formData.visitNotes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                visitNotes: e.target.value,
                              })
                            }
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                            placeholder="Describe the visit outcomes, observations, and key discussions..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Store Rating
                            </label>
                            <div className="flex items-center space-x-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      storeRating: rating,
                                    })
                                  }
                                  className={`w-8 h-8 rounded-full ${
                                    rating <= formData.storeRating
                                      ? "bg-[#F57C00]"
                                      : "bg-gray-300"
                                  } transition-colors`}
                                >
                                  <Star className="w-4 h-4 text-white mx-auto" />
                                </button>
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                {formData.storeRating}/5
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issues Found
                            </label>
                            <div className="space-y-1">
                              {commonIssues.slice(0, 4).map((issue) => (
                                <label
                                  key={issue}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.issuesFound.includes(
                                      issue
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData({
                                          ...formData,
                                          issuesFound: [
                                            ...formData.issuesFound,
                                            issue,
                                          ],
                                        });
                                      } else {
                                        setFormData({
                                          ...formData,
                                          issuesFound:
                                            formData.issuesFound.filter(
                                              (i: any) => i !== issue
                                            ),
                                        });
                                      }
                                    }}
                                    className="rounded text-[#F57C00] focus:ring-[#F57C00]"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {issue}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Items */}
                  {(mode === "complete" || mode === "edit") && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#2A2E33] flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-[#F57C00]" />
                          Action Items
                        </h3>
                        <button
                          type="button"
                          onClick={addActionItem}
                          className="bg-[#F57C00] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#E65100] transition-colors"
                        >
                          Add Action
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formData.actionItems.map((action: any, index: any) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-white p-3 rounded-lg"
                          >
                            <div className="md:col-span-2">
                              <input
                                type="text"
                                placeholder="Action item description"
                                value={action.task}
                                onChange={(e) => {
                                  const newActionItems = [
                                    ...formData.actionItems,
                                  ];
                                  newActionItems[index].task = e.target.value;
                                  setFormData({
                                    ...formData,
                                    actionItems: newActionItems,
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              />
                            </div>
                            <div>
                              <select
                                value={action.priority}
                                onChange={(e) => {
                                  const newActionItems = [
                                    ...formData.actionItems,
                                  ];
                                  newActionItems[index].priority =
                                    e.target.value;
                                  setFormData({
                                    ...formData,
                                    actionItems: newActionItems,
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="date"
                                value={action.dueDate}
                                onChange={(e) => {
                                  const newActionItems = [
                                    ...formData.actionItems,
                                  ];
                                  newActionItems[index].dueDate =
                                    e.target.value;
                                  setFormData({
                                    ...formData,
                                    actionItems: newActionItems,
                                  });
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => removeActionItem(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-up */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#2A2E33] mb-4">
                      Follow-up Required
                    </h3>

                    <div className="space-y-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.followUpRequired}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              followUpRequired: e.target.checked,
                            })
                          }
                          className="rounded text-[#F57C00] focus:ring-[#F57C00]"
                        />
                        <span className="text-sm text-gray-700">
                          This visit requires follow-up
                        </span>
                      </label>

                      {formData.followUpRequired && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Follow-up Date
                            </label>
                            <input
                              type="date"
                              value={formData.followUpDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  followUpDate: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Follow-up Notes
                            </label>
                            <textarea
                              value={formData.followUpNotes}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  followUpNotes: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none"
                              placeholder="Describe what needs to be followed up..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Fixed Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="store-visit-form"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>
                        {mode === "schedule"
                          ? "Schedule Visit"
                          : mode === "complete"
                          ? "Complete Visit"
                          : "Update Visit"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreVisitForm;
