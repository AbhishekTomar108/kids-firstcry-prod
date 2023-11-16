import React, {useContext} from 'react'
import diaper from "../images/diaper-category.png"
import toy from "../images/toy-catergory.png"
import stroller from "../images/stroller-category.png"
import jacket from "../images/Jacket-category.png"
import { Link } from "react-router-dom";
import LoginContext from '../Context/LoginContext'
export default function Category() {
  const ContextValue = useContext(LoginContext);
  return (
    <>
   
    <div style={{width:"100vw", textAlign:"center"}} className="container">
    <h2>Top Category</h2>
   

    <div className='separator-image'></div>
    <div className="Category-container">
    <Link to='categories'><div className='toys' onClick={()=>ContextValue.updateCategory("Toy")}><img className='image' src={toy} alt="" /></div></Link>
 <Link to='categories'><div className='diapers' onClick={()=>ContextValue.updateCategory("Diaper")}><img className='image' src={diaper} alt="" /></div></Link>
 <Link to='categories'><div className='stroller' onClick={()=>ContextValue.updateCategory("stroller")}><img className='image' src={stroller} alt="" /></div></Link>
<Link to='categories'><div className='jacket' onClick={()=>ContextValue.updateCategory("Jacket")}><img className='image' src={jacket} alt="" /></div></Link>
</div>


    </div>
    
    
    
    </>
  )
}