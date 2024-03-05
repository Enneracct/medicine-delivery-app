import React, { useContext, useEffect, useState } from 'react';
import '../styles/CartList.css';
import { MedicineContext } from '../MedicineContext';
import EmptyCartPage from './EmptyCartPage';

function CartList({ onQuantityChange, cartItems, handleTotalCostChange }) {
  const { handleRemoveFromCart } = useContext(MedicineContext);
  const [quantities, setQuantities] = useState([]);

  // Update quantities state when cartItems changes
  useEffect(() => {
    const initialQuantities = cartItems.map(() => 1);
    setQuantities(initialQuantities);
  }, [cartItems]);

  // Update total cost whenever quantities change
  useEffect(() => {
    // Calculate total cost based on quantities
    const totalCost = cartItems.reduce((total, product, index) => {
      return total + parseFloat(product.price) * quantities[index];
    }, 0);

    // Update the total cost in the parent component
    handleTotalCostChange(totalCost.toFixed(2));
  }, [quantities]);

  const handleRemoveClick = (medicineId) => {
    handleRemoveFromCart(medicineId);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
    // Call the callback function to pass the updated quantities array to the parent
    onQuantityChange(newQuantities);
  };

  return (
    <div className='flex flex-1 px-3 pt-10 justify-center'>
      <div className='cart-container'>
        {/* Render each cart item */}
        {cartItems.map((product, index) => (
          <div key={index} className='cart-item'>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/021/193/213/small/medicine-bottle-and-pills-icon-medical-assets-3d-rendering-png.png" alt="#" />
            <div className='item-info'>
              <h3>{product.product_name}</h3>
              <p>Price: ${product.price}</p>
              <form className="flex justify-between max-w-sm">
                <label htmlFor={`quantity-input-${index}`}>Count:</label>
                <input
                  type="number"
                  id={`quantity-input-${index}`}
                  className="w-12 text-center rounded-xl border-2 border-emerald-600 focus:outline-emerald-800 text-black"
                  placeholder="0"
                  min="0"
                  value={quantities[index] || 0} //   value={product.selectedQuantity || ''}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
              </form>
            </div>
            <button className='remove-btn' onClick={() => handleRemoveClick(product.product_id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;