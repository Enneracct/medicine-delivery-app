import React, { useContext } from "react";
import { Link } from 'react-router-dom'; 
import { MedicineContext } from '../MedicineContext'; // Import MedicineContext

function NavBar(){
    const { selectedMedicines } = useContext(MedicineContext); 

    const cartItemCount = selectedMedicines.length;

    return(
        <nav className="flex p-3 bg-white divide-y-0">
            <div>
                {/* Link to navigate to the home page */}
                <Link to="/">
                    <button className="text-slate-800 px-2 py-1"><span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>Home</span></button>
                </Link>
            </div>
            <div>
                {/* Link to navigate to the cart page */}
                <Link to="/cart">
                <button className="flex gap-2 px-4 py-1 text-slate-800 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg> Cart {cartItemCount > 0 && <span className="text-white bg-emerald-500 font-400 text-xs ml-1 px-1 rounded-full">{cartItemCount}</span>}</button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
