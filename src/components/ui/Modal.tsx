import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: JSX.Element;
  footer: JSX.Element;
  modalContent: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  modalContent,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full z-10">
         {header} 
         {modalContent} 
        <div className="flex justify-end">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
