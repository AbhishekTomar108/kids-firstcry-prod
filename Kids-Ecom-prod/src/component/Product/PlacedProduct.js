import React, {useEffect, useState} from 'react'

const PlacedProduct = () => {
    const [userProductData, setuserProductData]  = useState();
    const [addedItem, setaddedItem] = useState([]);
    const [totalAmount, settotalAmount]  = useState(0);

    useEffect(()=>{
        fetchUserSavedProduct()
    },[])
 

    const fetchUserSavedProduct  =async()=>{
        try
       { const response = await fetch("http://localhost:5000/api/product/fetchalluserplacedproduct", {
            method: 'GET',            
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('KidsCommerce')
            },
             
          });
    
       
          const json = await response.json();
       
          if(json.success){
             console.log('user placed product = ',json.productCart); 
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

      const updateTotalAmount =(productData)=>{
        let total =0;
       productData.map((data)=>{
         
         total = total + (data.productPrice*data.totalItem);
        })
       const finalTotal=  Math.trunc(total)
        settotalAmount(finalTotal);
      }

  return (
   
    <div className='product-placed-container'>
        <div className="col-lg-8 col-sm table-responsive mb-5 product-placed-table">
            <table className="table table-light table-borderless table-hover text-center mb-0 product-table">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Order Placed</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody className="align-middle">
               
               
               
                {userProductData && userProductData.map((data,index)=>{

                  return(     
                      <tr key={index}>
                  <td className="align-middle">{data.productName}</td>
                  <td className="align-middle">{data.productPrice}</td>
                  <td className="align-middle">
                    {data.totalItem}
                  </td>
                  <td className="align-middle">{data.productPrice*data.totalItem}</td>
                  <td className="align-middle">{new Date(data.date).toLocaleDateString()}</td>
                  <td className="align-middle">{data.deliveryDate}</td>
                </tr>
                  )
                }) }

              </tbody>
            </table>
          </div>
    </div>
  )
}

export default PlacedProduct