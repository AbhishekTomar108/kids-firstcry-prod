import React, { useState } from 'react'
import LoginContext from './LoginContext'

const LoginState = (props) => {

    const [user, setUser] = useState({
      name:"",
      email:"",
    });

  
    const [productname, setproductname] = useState();
    const [filterProduct, setfilterProduct] = useState(false)
    const [filterProductByAge, setfilterProductByAge] = useState(false)
    const [category, setcategory] = useState(false)

  const updateFilterProduct = (value)=>{

    console.log('filter context ',value)
    setfilterProduct(value)
    localStorage.setItem('status',"filterdata")
  }
  const updateFilterProductByAge = (value)=>{

    console.log('filter by age context ',value)
    setfilterProductByAge(value)
  }

    const updateUser = (data)=>{
        setUser({...user, name:data.name, email:data.email});
    }

   

    const updateproductname = (data)=>{
      localStorage.setItem( 'product', data );
      localStorage.setItem( 'status', "byproduct" );
      setproductname(data);
    
    }

    const updateCategory = (data)=>{
      localStorage.setItem( 'category', data );
      localStorage.setItem( 'status', "category" );
      setcategory(data);
    }
    const updateAge = (data)=>{
      localStorage.setItem( 'age', data );
      localStorage.setItem( 'status', "age" );
  
    }

    const fetchuserDetails = async()=>{
      const response = await fetch("https://commerce-backend-test.onrender.com/api/auth/getuser", {
     method: 'GET', 
     
     headers: {
       'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('KidsCommerce')
     },
      
   });

   const json = await response.json();

   if(json.success){
      console.log('user = ',json.user);
      setUser({...user,name:json.user.name, email:json.user.email})
      localStorage.setItem('userStatus',true);
   }

   else{
      console.log('error = ',json.error); 
   }
  }

  return (
    <LoginContext.Provider value={{user, updateUser, productname, updateproductname, fetchuserDetails, filterProduct, updateFilterProduct, category, updateCategory, updateAge, updateFilterProductByAge,filterProductByAge}}>
    {props.children}
</LoginContext.Provider>
  )
}

export default LoginState