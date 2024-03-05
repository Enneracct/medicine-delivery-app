import React, { createContext, useState, useEffect } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    // Load bookmarked items from localStorage on component mount
    const storedBookmarks = localStorage.getItem('bookmarkedItems');
    if (storedBookmarks) {
      setBookmarkedItems(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (product) => {
    const updatedBookmarks = [...bookmarkedItems];
    const index = updatedBookmarks.findIndex(item => item.product_id === product.product_id);
    if (index !== -1) {
      updatedBookmarks.splice(index, 1);
    } else {
      updatedBookmarks.push(product);
    }
    setBookmarkedItems(updatedBookmarks);
    // Save bookmarked items to localStorage
    localStorage.setItem('bookmarkedItems', JSON.stringify(updatedBookmarks));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};