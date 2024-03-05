import React, { useContext, useState } from 'react';
import EmptyCartPage from './EmptyCartPage';
import Address from './Address';
import CartList from './CartList';
import { MedicineContext } from '../MedicineContext';

function CartPage() {
  const { selectedMedicines, clearSelectedMedicines  } = useContext(MedicineContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [quantities, setQuantities] = useState([]);

  const handleQuantityChange = (newQuantities) => {
    setQuantities(newQuantities);
  };

  const [totalCost, setTotalCost] = useState(0); // Define totalCost and setTotalCost

  // Check if cartItems is empty or null
  if (!selectedMedicines || selectedMedicines.length === 0) {
    return <EmptyCartPage/>;
  }

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle order submission
  const handleOrderSubmit = async () => {
    // Check if any fields are empty
    if (areFieldsEmpty(formData)) {
      alert('Please fill in all required fields.');
      return; // Prevent order submission if fields are empty
    }

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Create a map for shoppingCart
    const shoppingCartMap = {};
    selectedMedicines.forEach((medicine, index) => {
      shoppingCartMap[medicine.product_id] = quantities[index];
    });
    
    try {
      // Combine form data and updated cart data
      const orderData = {
        ...formData,
        cart: shoppingCartMap, // Use the map for shoppingCart
      };
  
      console.log(orderData);
  
      // Send the order data to the server
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (response.ok) {
        // Clear form data or perform any other actions
        clearSelectedMedicines();
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error
    }
  };
  
  
  const handleTotalCostChange = (cost) => {
    setTotalCost(cost);
  };

  return (
    <div>
      <div className='flex'>
        <Address formData={formData} setFormData={setFormData} handleChange={handleChange} />
        <CartList onQuantityChange={handleQuantityChange} cartItems={selectedMedicines} handleTotalCostChange={setTotalCost} />
      </div>
      <div className='flex justify-end px-20 items-baseline text-sm'>
        <h2 className='text-black border-2 border-emerald-600 px-3 py-1 translate-x-1'>Total Cost: ${totalCost}</h2>
        <button className='bg-emerald-600 outline border-2 border-emerald-600 px-5 py-1 text-white active:bg-emerald-700' onClick={handleOrderSubmit}>Submit Order</button>
      </div>
    </div>
  );
}

// Function to check if any fields in the form data are empty
function areFieldsEmpty(formData) {
  for (const key in formData) {
    // Exclude the address field from the check
    if (key !== 'address' && formData[key].trim() === '') {
      return true; // Found an empty field
    }
  }
  return false; // No empty fields found
}

export default CartPage;
