
import React, { useEffect, useState, useRef} from 'react'
import { Navigate, useNavigate } from "react-router-dom";



export default function ProductCheckOut() {
  const navigate = useNavigate();
  
    const [userDetail, setuserDetail] = useState({
    firstName:"",
    lastName:"",
    email:"",
    mobile:"",
    addressLine1:"",
    addressLine2:"",
    country:"",
    city:"",
    state:"",
    zipCode:""
  })

 

  const [productData, setproductData] = useState();
  const [amount, setAmount]  =useState(0);
  const [userAddressStatus, setuserAddressStatus]  =useState(false);
  const [updateAddressStatus, setupdateAddressStatus]  =useState(false);
  const [addressId, setaddressId]  = useState();
  const editBtn = useRef()
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [deliveryDate, setDeliveryDate]  =useState()


  useEffect(()=>{

    checkUserAddress()
    let date = getDateAfterFiveDays()
    

    setDeliveryDate(date.toLocaleDateString())

    const dataproduct = JSON.parse(localStorage.getItem('productCartData'))
    setproductData(dataproduct)
    console.log("product data ", productData);
    let total = 0;
    dataproduct.map(data=>{
        total = total + (data.productPrice*data.totalItem)
    })

    setAmount(total.toFixed(2));
    console.log('set Amount =',total.toFixed(2))
    localStorage.setItem('totalamount',total.toFixed(2))
  },[])

  function getDateAfterFiveDays() {
    // Get the current date
    const currentDate = new Date();
  
    // Add 5 days to the current date
    const dateAfterFiveDays = new Date(currentDate);
    dateAfterFiveDays.setDate(currentDate.getDate() + 5);
  
    // Return the result
    return dateAfterFiveDays;
  }

  const checkUserAddress = async()=>{
   
    try
    { const response = await fetch("http://localhost:8000/api/auth/checkuseraddress", {
       method: 'GET', 
       
       headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('KidsCommerce')
       },
       
     });

     const json = await response.json();

     if(json.userstatus){
      console.log('user status from if=',json.user)
      console.log('address id =', json.user._id)
      setaddressId(json.user._id);
      setuserDetail(json.user)
      setuserAddressStatus(true)
     }

     else{
      console.log('user status =',json.user)
     }
  
}
catch{
  console.log("sorry there is some error occured")  
}
}

const updateAddress = async()=>{
  console.log('address id from update=', addressId)
  const data  = await fetch(`http://localhost:8000/api/auth/updateaddress/${addressId}`,{
    method: 'POST', 
       
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('KidsCommerce')
    },
    body: JSON.stringify({firstName:userDetail.firstName,lastName:userDetail.lastName,email:userDetail.email,mobile:userDetail.mobile,addressLine1:userDetail.addressLine1,addressLine2:userDetail.addressLine2,country:userDetail.country,city:userDetail.city,state:userDetail.state,zipCode:userDetail.zipCode}) 

  });

 
  const response = await data.json()
  console.log('update address = ',response)
  setuserAddressStatus(true)
  setupdateAddressStatus(false)
  editBtn.current.style.display = "block";
  // navigate('/')

  

}

const handleClick = () => {
  if (userAddressStatus) {
    editBtn.current.style.display = "none";
    setuserAddressStatus(false);
    setupdateAddressStatus(true)
  } else {
    submitAddress();
  }
};


// const paymentfunc = async()=>{
//   console.log('payment func is running')

//   const data = await fetch('http://localhost:8000/api/product/payment',{
//     method:"POST"
//   })

//   console.log('payment data =',await data.json())

// }

const loadScript = (src)=>{

  console.log('on load running')
  return new Promise((resolve)=>{  const script = document.createElement('script')
  script.src = src

  script.onload = ()=>{
    resolve(true)
  }

  script.onerror  = ()=>{
    resolve(false)
  }

  document.body.appendChild(script)
})

}



// const displayRazorpay = ()=>{

//   var options = {
//     "key": "rzp_test_wVnLdv07rf1EF2", // Enter the Key ID generated from the Dashboard
//     "amount": `${localStorage.getItem('totalamount')*100}`,
//     "currency": "INR",
//     "description": "Acme Corp",
//     "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
//     "prefill":
//     {
//       "email": "gaurv.kumar@example.com",
//       "contact": +91,
//     },
//     config: {
//       display: {
//         blocks: {
//           utib: { //name for Axis block
//             name: "Pay using Axis Bank",
//             instruments: [
//               {
//                 method: "card",
//                 issuers: ["UTIB"]
//               },
//               {
//                 method: "netbanking",
//                 banks: ["UTIB"]
//               },
//             ]
//           },
//           other: { //  name for other block
//             name: "Other Payment modes",
//             instruments: [
//               {
//                 method: "card",
//                 issuers: ["ICIC"]
//               },
//               {
//                 method: 'netbanking',
//               },
//               {
//                 method: "upi"
//                 }
//             ]
//           }
//         },
//         // hide: [
//         //   {
//         //   method: "upi"
//         //   }
//         // ],
//         sequence: ["block.utib", "block.other"],
//         preferences: {
//           show_default_blocks: false // Should Checkout show its default blocks?
//         }
//       }
//     },
//     "handler": function (response) {
//       alert(response.razorpay_payment_id);
//     },
//     "modal": {
//       "ondismiss": function () {
//         if (confirm("Are you sure, you want to close the form?")) {
//           txt = "You pressed OK!";
//           console.log("Checkout form closed by the user");
//         } else {
//           txt = "You pressed Cancel!";
//           console.log("Complete the Payment")
//         }
//       }
//     }
//   };
//   var rzp1 = new Razorpay(options);
//   rzp1.open();
// }



// const paymentfunc  =async(paymentamount)=>{

//   return new Promise((resolve)=>{
//     const script  = document.createElement('script')
//     script.src = "https://checkout.razorpay.com/v1/checkout.js"
//     document.body.appendChild(script)
  
//      script.onload  =displayRazorpay
//   })
 

// }




// const paymentfunc = async(paymentamount)=>{
// console.log('payment is running')

//   const res  = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

//   if(!res){
//     alert('you are offlie')
//     return
//   }
// }


const submitOrder = async(amount)=>{

  console.log('submit running',JSON.parse(localStorage.getItem('productCartData')))

  const data = await fetch('http://localhost:8000/api/product/productcartsaved',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('KidsCommerce')
    },
    body:JSON.stringify({productCart:JSON.parse(localStorage.getItem('productCartData')),deliveryDate:deliveryDate})
  })

   const savedData = await data.json();

   console.log('saved data =',savedData)
   alert('product has been placed')
  //  navigate('/')
   
  //  paymentfunc(amount*100)
  

}

  const submitAddress = async()=>{
    console.log('submit order data =', userDetail)
    try
    { const response = await fetch("http://localhost:8000/api/auth/adduseraddress", {
       method: 'POST', 
       
       headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('KidsCommerce')
       },
       body: JSON.stringify({firstName:userDetail.firstName,lastName:userDetail.lastName,email:userDetail.email,mobile:userDetail.mobile,addressLine1:userDetail.addressLine1,addressLine2:userDetail.addressLine2,country:userDetail.country,city:userDetail.city,state:userDetail.state,zipCode:userDetail.zipCode,      
      }) 
        
     });
     const json = await response.json();
     console.log(json);
     if(json.success)
     {
      
       console.log('savedaddress  =',json.useraddress)
       alert('your order has placed')
       navigate("/proceedtocheckout");
       

      
     }
     else{
      
        console.log("error =",json.error)
     }}

     catch{
            console.log("sorry there is some error occured")
     }
  }
  
  return (
    <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb bg-light mb-30">
                <a className="breadcrumb-item text-dark" href="#">Home</a>
                <a className="breadcrumb-item text-dark" href="#">Shop</a>
                <span className="breadcrumb-item active">Checkout</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Checkout Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
              <div className="bg-light p-0 mb-5">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="John" name="firstName"  value={userDetail.firstName} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="Doe" name="lastName"   value={userDetail.lastName} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})}/>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input className="form-control" disabled={userAddressStatus} type="email" required placeholder="example@email.com" name="email"   value={userDetail.email} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input className="form-control" disabled={userAddressStatus} type="Number" required placeholder="+123 456 789" name="mobile"   value={userDetail.mobile} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 1</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="123 Street" name="addressLine1"   value={userDetail.addressLine1} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 2</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="123 Street" name="addressLine2"   value={userDetail.addressLine2} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                 
                  <div className="col-md-6 form-group">
                    <label>City</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="New York" name="city"   value={userDetail.city} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>State</label>
                    <input className="form-control" disabled={userAddressStatus} type="text" required placeholder="New York" name="state"   value={userDetail.state} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>ZIP Code</label>
                    <input className="form-control" disabled={userAddressStatus} type="Number" required placeholder={123} name="zipCode"   value={userDetail.zipCode} onChange={(e)=>setuserDetail({...userDetail,[e.target.name]:e.target.value})} />
                  </div>
                  {/* <div className="col-md-12 form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="newaccount" />
                      <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                    </div>
                  </div> */}
                  {/* <div className="col-md-12">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="shipto" />
                      <label className="custom-control-label" htmlFor="shipto" data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                    </div>
                  </div> */}
                </div>
              </div>
            <div className='d-flex g-gap'>
           <div ref={editBtn} ><button className='edit-submit-btn' onClick={handleClick}>{userAddressStatus?"Edit":"Submit Address Details"}</button></div> 
           {updateAddressStatus && <div><buton className='edit-submit-btn' onClick={updateAddress}>Update Address</buton></div> }
            </div>
            </div>  

            <div className="col-lg-4 order-total">
              <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                  <h6 className="mb-3">Products</h6>
                 { productData && productData.map((data,index)=>{
                  return (
                    <div className="d-flex justify-content-between product-number-price" key={index}>
                      <div className='d-flex'>
                      <strong className='mx-1 number'>{index+1}.</strong>
                    <p>{data.productName}</p>
                    </div>
                    <p>{data.productPrice*data.totalItem}</p>
                  </div>
                  )
                 })}
                 
                  
                </div>
                <div className="border-bottom pt-3 pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>{amount} &#x20B9;</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">10 &#x20B9;</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>{amount>0?parseFloat(amount)+10:0} &#x20B9;</h5>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Expected Delivery Date</h5>
                    <h5>{deliveryDate}</h5>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                <div className="bg-light p-30">
                  {/* <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input type="radio" className="custom-control-input" name="payment" id="paypal" />
                      <label className="custom-control-label" htmlFor="paypal">Online Payment</label>
                    </div>
                  </div> */}
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input type="checkbox" onChange={e=>setPaymentStatus(e.target.checked)} className="custom-control-input" name="payment" id="directcheck" />
                      <label className="custom-control-label" htmlFor="directcheck">Cash on Delivery</label>
                    </div>
                  </div>
                  {/* <div className="form-group mb-4">
                    <div className="custom-control custom-radio">
                      <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                      <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                    </div>
                  </div> */}
                  <button className="btn btn-block btn-primary font-weight-bold py-3" disabled={paymentStatus===false?true:false} onClick={()=>submitOrder(amount)}>Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Checkout End */}
    
    
    
    </>
  )
}