import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'


const UserHome = () => {
  const ContextValue = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(()=>{
    ContextValue.fetchuserDetails();
  },[])

    const logoutHandle =()=>{
        localStorage.clear();
        ContextValue.updateproductname('')
        localStorage.setItem('userStatus',false)
        navigate('/');
    }

  return (
    <div>
    
    { localStorage.getItem('userStatus')==="true" ? <div className='user-detail-conatiner container'>
    <div className='detail-section'>
      <label>Name</label>
      <label>{ContextValue.user.name}</label>
      <label>Email</label>
      <label>{ContextValue.user.email}</label>

    </div>
  </div> 
  :<div className='container'> Please Login to see the Cart</div>}
  <div className='container' style={{textAlign:"center", marginTop:"20px"}}><button  onClick={logoutHandle} className='logout-btn'>Logout</button></div>
  </div>
  )
}

export default UserHome