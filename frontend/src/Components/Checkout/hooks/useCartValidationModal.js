import { useState } from "react";

export const useCartValidationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationResults, setValidationResults] = useState([]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    validationResults,
    setValidationResults,
    toggleModal,
  };
};
