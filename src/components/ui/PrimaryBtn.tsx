import React from "react";
import Spinner from "../ui/Spinner";
import classNames from "classnames";

interface PrimaryButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Optional for different button types
  className?: string; // Accept additional className as a prop
  isDisabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  onClick,
  children,
  type = "button", // Default type to button
  className = "", // Default to empty string if no className is passed
  isDisabled = false, // Default button disable is false
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        "border border-violet-500  px-5 hover:bg-violet-500 bg-violet-600 text-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center",
        className
      )}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default PrimaryButton;
