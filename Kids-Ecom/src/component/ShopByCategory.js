import React, { useContext } from 'react'
import LoginContext from '../Context/LoginContext'
import { Link } from "react-router-dom";
import toysSmall from '../images/toys-small.webp'


export default function ShopByCategory() {
  const ContextValue = useContext(LoginContext);
  return (
    <>

      <div style={{ width: "100vw", textAlign: "center" }} className="container">
        <h2>Shop By Category</h2>
        <span className='bestseller-span container'>Explore the Collection based on the Category</span>

        <div className='separator-image'></div>
        <div className="shop-by-Category-container ">
          <div className='shop-by-category'><Link to='categories'><div className='accessories categories-image' onClick={() => ContextValue.updateCategory("Accessory")}></div></Link><span className='py-3'>Accessories</span></div>
          <div className='shop-by-category'><Link to='categories'><div className='toys categories-image' onClick={() => ContextValue.updateCategory("Toy")}></div></Link><span className='py-3'>Toys</span></div>
          <div className='shop-by-category'><Link to='categories'><div className='diapers categories-image' onClick={() => ContextValue.updateCategory("Diaper")}></div></Link><span className='py-3'>Diaper</span></div>
          <div className='shop-by-category '><Link to='categories'><div className='cot categories-image' onClick={() => ContextValue.updateCategory("Cot")}></div></Link><span className='py-3'>Cots</span></div>
          <div className='shop-by-category'><Link to='categories'><div className='jacket categories-image' onClick={() => ContextValue.updateCategory("Jacket")}></div></Link><span className='py-3'>Jackets</span></div>
          <div className='shop-by-category'><Link to='categories'><div className='stroller categories-image' onClick={() => ContextValue.updateCategory("stroller")}></div></Link><span className='py-3'>Strollers</span></div>
        </div>


      </div>



    </>
  )
}