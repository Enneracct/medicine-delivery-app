import React, { useState, useEffect, useContext } from 'react';
import '../styles/MedicineGrid.css';
import { MedicineContext } from '../MedicineContext';
import { BookmarkContext } from '../BookmarkContext';


function MedicineGrid() {
    const [productList, setProductList] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const { handleAddToCart } = useContext(MedicineContext);
    const { bookmarkedItems, toggleBookmark } = useContext(BookmarkContext);
  
    useEffect(() => {
      async function fetchMedicine() {
        try {
          const response = await fetch('/api/medicine'); // Fetch data from the /medicine endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
    
          // Add isBookmarked property to each product
          const productsWithBookmark = data.map(product => ({
            ...product,
            isBookmarked: bookmarkedItems.some(item => item.product_id === product.product_id)
          }));
    
          setProductList(productsWithBookmark); // Set the fetched data with isBookmarked to state
        } catch (error) {
          console.error('Error fetching medicine data:', error);
        }
      }
    
      fetchMedicine();
    }, [bookmarkedItems]); // Update productList whenever bookmarkedItems change

    const sortProducts = (criteria) => {
      let sortedProducts = [...productList];
    
      // Sort products based on the selected criteria
      sortedProducts.sort((a, b) => {
        if (a.isBookmarked && !b.isBookmarked) {
          return -1; // prioritize bookmarked items
        } else if (!a.isBookmarked && b.isBookmarked) {
          return 1; // prioritize non-bookmarked items
        } else {
          // If both items have the same bookmarked status, sort based on the criteria
          if (criteria === 'price') {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
          } else if (criteria === 'name') {
            return sortDirection === 'asc' ? a.product_name.localeCompare(b.product_name) : b.product_name.localeCompare(a.product_name);
          }
          return 0;
        }
      });
    
      setSortCriteria(criteria);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      setProductList(sortedProducts);
    };
  
  
    return (
      <div className="flex flex-col h-auto">
        <div className='flex justify-end my-4 mr-12'>
          <button className='bg-neutral-100 border border-neutral-200 rounded-l-md text-black px-3 py-1 focus:bg-neutral-200' onClick={() => sortProducts('price')}>Sort by price <span className='text-emerald-600'>{sortCriteria === 'price' && sortDirection === 'asc' && '▲'} {sortCriteria === 'price' && sortDirection === 'desc' && '▼'}</span></button>
          <button className='bg-neutral-100 border border-neutral-200 rounded-r-md text-black px-3 py-1 focus:bg-neutral-200' onClick={() => sortProducts('name')}>Sort by name <span className='text-emerald-600'>{sortCriteria === 'name' && sortDirection === 'asc' && '▲'} {sortCriteria === 'name' && sortDirection === 'desc' && '▼'}</span></button>

        </div>
        <div className="medicine-grid">
          {productList.map((product) => (
            <div key={product.product_id} className="grid-item">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/021/193/213/small/medicine-bottle-and-pills-icon-medical-assets-3d-rendering-png.png" alt="#" />
              <h3 className='font-500 mt-2'>{product.product_name}</h3>
              <div className='flex justify-between gap-7'>
                <button className='w-full bg-emerald-500 text-white active:bg-emerald-600' onClick={() => handleAddToCart(product)}>{product.price} $</button>
                <button onClick={() => toggleBookmark(product)} className='favourites-btn'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill={bookmarkedItems.some(item => item.product_id === product.product_id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default MedicineGrid;