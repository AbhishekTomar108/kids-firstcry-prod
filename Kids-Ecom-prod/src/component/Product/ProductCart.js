import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function ProductCart() {

  const [userProductData, setuserProductData] = useState();
  const [totalAmount, settotalAmount] = useState(0);
  const [addedItem, setaddedItem] = useState([]);

  useEffect(()=>{
      fetchUserSavedProduct();
  },[])

  const addItem = async (index,productPrice)=>{

    const additem = [...addedItem];
    additem[index] = additem[index]+1;
    setaddedItem(additem)

    let data  = await fetch(`http://localhost:8000/api/product/updateproductcart/${userProductData[index]._id}`,
    {method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({totalItem:additem[index]})
  }
    )

    let total  = productPrice*1;
   
    total  = totalAmount+total;
    console.log('total amount =',total.toFixed(2))
    settotalAmount(total.toFixed(2))
    console.log(await data.json())
 
  
}
const removeItem = async(index,productPrice)=>{
  if(addedItem[index]>1){

    const additem = [...addedItem];
    additem[index] = additem[index]-1
    setaddedItem(additem)
    console.log('added item =', additem[index])

    let data  = await fetch(`http://localhost:8000/api/product/updateproductcart/${userProductData[index]._id}`,
    {method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({totalItem:additem[index]})
  }
    )

    let total  = productPrice;
    console.log(productPrice)
    total  = totalAmount-total;
   
    console.log('total amount =',total.toFixed(2))
    settotalAmount((total).toFixed(2))
    console.log(await data.json())
    
    
  }
}

const removeProduct = (Index,totalPrice)=>{

  fetch(`http://localhost:8000/api/product/removeproductcart/${userProductData[Index]._id}`,
  {method: 'POST',}
  )
  console.log('product id =',userProductData[Index]._id)
 
  const productData = [...userProductData]
  productData.splice(Index,1)
  setuserProductData(productData);

  let total  = totalAmount -  (totalPrice);
  console.log('total ',total.toFixed(2))
  settotalAmount(total.toFixed(2));
  
}

const updateTotalAmount =(productData)=>{
  let total =0;
 productData.map((data)=>{
   
   total = total + (data.productPrice*data.totalItem);
  })
 const finalTotal=  total
 console.log('total amount =',total.toFixed(2))
  settotalAmount(finalTotal.toFixed(2));
}

  const fetchUserSavedProduct  =async()=>{
    try
   { const response = await fetch("http://localhost:8000/api/product/fetchalluserproduct", {
        method: 'GET', 
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('KidsCommerce')
        },
         
      });

   
      const json = await response.json();
   
      if(json.success)
      {
         console.log('userAllproductCart = ',json.productCart); 
         setuserProductData(json.productCart); 
         updateTotalAmount(json.productCart);  
         localStorage.setItem('productCartData',JSON.stringify(json.productCart)) 
         let addItemArray = [...addedItem]
         json.productCart.map((data,index)=>{
          
          addItemArray[index] = data.totalItem;
         })  
         setaddedItem(addItemArray);  
      }
   
      else{
         console.log('error = ',json.error); 
      }}

      catch{
        console.log('error = ',"sorry some error occured"); 
      }
  }

  return (
    <>

      {/* Breadcrumb Start */}
      {/* <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb bg-light mb-30">
                <a className="breadcrumb-item text-dark" href="#">Home</a>
                <a className="breadcrumb-item text-dark" href="#">Shop</a>
                <span className="breadcrumb-item active">Checkout</span>
              </nav>
            </div>
          </div>
        </div> */}
        {/* Breadcrumb End */}
     {/* Cart Start */}
     <div className="container-fluid" style={{marginTop:"50px"}}>
        <div className="row px-xl-5">
          <div className="col-lg-8 col-sm table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0 product-table">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
               
               
               
                {userProductData && userProductData.map((data,index)=>{

                  return(     
                      <tr key={index}>
                  <td className="align-middle">{data.
productName}</td>
                  <td className="align-middle">{(data.productPrice).toFixed(2)}</td>
                  <td className="align-middle">
                    <div className="input-group quantity mx-auto" style={{width: '110px',alignItems:'center'}}>
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-minus" onClick={()=>removeItem(index,data.productPrice)}>
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                      <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" style={{padding:"0"}} value={addedItem[index]} />
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-plus" onClick={()=>addItem(index,data.productPrice)}>
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{(data.productPrice*data.totalItem).toFixed(2)}</td>
                  <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={()=>removeProduct(index,(data.productPrice*data.totalItem))}><i className="fa fa-times" /></button></td>
                </tr>
                  )
                }) }

              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            {/* <form className="mb-30" action>
              <div className="input-group">
                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form> */}
            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>{totalAmount} &#x20B9;</h6>
                </div>
                <div className="d-flex justify-content-between">
                 { totalAmount!==0 && <> <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">10 &#x20B9;</h6> </>}
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>{parseInt(totalAmount)!==0?(parseFloat(totalAmount)+10):0} &#x20B9;</h5>
                </div>
                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3"> <Link to="/proceedtocheckout"> Proceed To Checkout </Link> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
    
    
    
    </>
  )
}