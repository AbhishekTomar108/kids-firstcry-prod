import React, {useContext} from 'react'
import LoginContext from '../Context/LoginContext'
import { Link } from "react-router-dom";
import zeroToOne from '../images/0-1years.webp'
import oneToTwo from '../images/1-2years.jpg'
import twoToThree from '../images/2-4years.webp'
import fourPlus from '../images/4+years.jpg'
import separator from '../images/separator.webp'

const ShopByAge = () => {
  const ContextValue = useContext(LoginContext);
  return (
    <div className='shop-by-age-container'>
     <h2>Shop By Age</h2>
     <span>Choose Products according to Age of Kid</span>
     <div className='separator-image'></div>
     <div className='age-image-container d-flex flex-row justify-content-around'>
      
        <Link to='categories'><div className='each-img-block' onClick={()=>{ContextValue.updateAge("0-1");ContextValue.updateFullAgeStatus(false)}}><img src={zeroToOne}></img></div></Link>
        <Link to='categories'><div className='each-img-block' onClick={()=>{ContextValue.updateAge("2-1");ContextValue.updateFullAgeStatus(false)}}><img src={oneToTwo}></img></div></Link>
        <Link to='categories'><div className='each-img-block' onClick={()=>{ContextValue.updateAge("2-3");ContextValue.updateFullAgeStatus(false)}}><img src={twoToThree}></img></div></Link>
        <Link to='categories'><div className='each-img-block' onClick={()=>{ContextValue.updateAge("3-4");ContextValue.updateFullAgeStatus(false)}}><img src={fourPlus}></img></div></Link>

     </div>
    </div>
  )
}

export default ShopByAge