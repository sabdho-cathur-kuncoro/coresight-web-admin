import React from "react";
import { AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getConfirmButtonClasses = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "info":
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  const footer = (
    <div className="flex items-center justify-end space-x-3">
      <button
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${getConfirmButtonClasses()}`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          confirmText
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      closeOnOverlayClick={!isLoading}
      showCloseButton={!isLoading}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
