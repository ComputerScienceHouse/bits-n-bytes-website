import { RefreshCw } from "lucide-react";

import React from "react";

interface InfoSpinnerProps {
  isCentered?: boolean;
  children?: React.ReactNode;
}

const InfoSpinner: React.FC<InfoSpinnerProps> = ({
  children = null,
  isCentered = false,
}) => {
  return (
    <div className={`spinner-container ${isCentered ? "centered" : ""}`}>
      <span className="sr-only">Loading...</span>
      <RefreshCw className="h-8 w-8 mx-auto mb-4 opacity-50 animate-spin" />
      <span className="spinner-text">{children ?? ""}</span>
    </div>
  );
};

export default InfoSpinner;
