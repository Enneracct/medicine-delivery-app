import React, { createContext, useState } from 'react';

const MedicineContext = createContext();

const MedicineProvider = ({ children }) => {
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleAddToCart = (product) => {
    if (!selectedMedicines.find(item => item.product_id === product.product_id)) {
      setSelectedMedicines([...selectedMedicines, product]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    console.log("Removing product with ID:", productId);
    const updatedMedicines = selectedMedicines.filter(item => item.product_id !== productId);
    console.log("Updated medicines:", updatedMedicines);
    setSelectedMedicines(updatedMedicines);
  };

  const clearSelectedMedicines = () => {
    setSelectedMedicines([]);
  };
  
  return (
    <MedicineContext.Provider value={{ selectedMedicines, handleAddToCart, handleRemoveFromCart, clearSelectedMedicines}}>
      {children}
    </MedicineContext.Provider>
  );
};

export { MedicineProvider, MedicineContext };