import React from 'react'
import '../styles/Pharmacies.css'; 

function Pharmacies() {
  return (
    <div className='pharmacies-container'>
      <div className='pharmacies'>
          <button className='text-center decoration-2 hover:underline underline-offset-8'>24/7 Pharmacy</button>
          <button className='text-center decoration-2 hover:underline underline-offset-8'>New Pharmacy</button>
          <button className='text-center decoration-2 hover:underline underline-offset-8'>APTEKA UA</button>
          <button className='text-center decoration-2 hover:underline underline-offset-8'>Tabletki UA</button>
      </div>
    </div>
  )
}

export default Pharmacies