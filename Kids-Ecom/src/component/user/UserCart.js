import React, { useEffect, useState, useContext } from 'react'
import LoginContext from '../../Context/LoginContext'
import ProductCart from '../Product/ProductCart';


const UserCart = () => {
  
  const ContextValue = useContext(LoginContext);

    useEffect(()=>{

      ContextValue.fetchuserDetails();
      
    },[])

  return (
    <div>
  { localStorage.getItem('userStatus')==="true" ? 
  // <div className='user-detail-conatiner container'>
  //     <div className='detail-section'>
  //       <label>Name</label>
  //       <label>{ContextValue.user.name}</label>
  //       <label>Email</label>
  //       <label>{ContextValue.user.email}</label>

  //     </div>
  //   </div> 
  <ProductCart/>
    :<div className='container'  style={{textAlign:"center", marginTop:"20px"}}> Please Login to see the Cart</div>}
    </div>
  )
}

export default UserCart