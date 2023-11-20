import Rearot, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'

const ProductDetails = () => {
  const ContextValue = useContext(LoginContext);
  const [readMoreStatus, setReadMoreStatus] = useState(false)
  const [sameProduct, setSameProduct] = useState()

  const [addedItem, setaddedItem] = useState(1);
  const [review, setReview] = useState()

  let productData = JSON.parse(localStorage.getItem("productData"))
  console.log('product data =',productData)

  const user = JSON.parse(localStorage.getItem("userData"))
  console.log("user data =",user)

  useEffect(()=>{
    window.scrollTo({top:0})
    getProductReview()
    getProductDetail(productData.title)
  },[])

  const getProductDetail = async(title)=>{

    let getProduct = await fetch(`http://localhost:8000/api/product/getProductDetail/`,{
      method:"GET",
      headers:{"Content-Type":"application/json",
                "title":title
    }
  })

  getProduct = await getProduct.json()
  setSameProduct(getProduct)
  console.log('get product  =',getProduct)

  }

  const [reviewDetail, setReviewDetail] = useState({
    review:"",
    username:user.name,
    email:user.email,
    productId:productData._id,
    rate:0,
    userId:user._id,
  })

  const addItem = ()=>{

      const additem = addedItem+1;
      setaddedItem(additem)   
    
  }
  const removeItem = ()=>{
    if(addedItem>1){

      const additem = addedItem-1;
      setaddedItem(additem)
    }
  }

  const submitUserProductCart =async()=>{
    
    if(localStorage.getItem('userStatus')==="true"){
      console.log('you can proceed')

      const response = await fetch("http://localhost:8000/api/product/addproduct", {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('KidsCommerce')
        },
         
        body: JSON.stringify({productName:productData.productname,totalItem:addedItem,productPrice:productData.price,
          productId:productData._id}) 
      });

   
      const json = await response.json();
   
      if(json.success){
         console.log('savedproductCart = ',json.savedproductCart);  
         console.log('userProductName  =',json.userProductName )       
      }
   
      else{
         console.log('error = ',json.error); 
      }

    
    }

    else{
      console.log('cannot procedd further');
    }

  }

  const addReview = async(event)=>{
    event.preventDefault()
    console.log('add review =',reviewDetail)

    let addReview = await fetch('http://localhost:8000/api/product/addReviews',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(reviewDetail)
  })

  }

  const getProductReview = async()=>{
    let getReview = await fetch(`http://localhost:8000/api/product/getProductReview/${productData._id}`,{
    method:"GET",
    headers:{"Content-Type":"application/json"}
  }
    )
    getReview = await getReview.json()
    console.log('getReview =',getReview)
    setReview(getReview)
  }

  const addStar = (total)=>{
    console.log("total = ",total)
    let starGroup = document.querySelectorAll('.star')
    setReviewDetail({...reviewDetail,["rate"]:total})

    starGroup.forEach((data,index)=>{
      if(index<total){
        data.classList.add('fas')
        data.classList.remove('far')
        data.classList.add('star-btn')
      }
      else{
        data.classList.remove('star-btn')
        data.classList.remove('fas')
        data.classList.add('far')
      }
    })
  }
  
  const fifeArray = [0,1,2,3,4]

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
         {/* Shop Detail Start */}
         <div className="container-fluid pb-5">
            <div className="row px-xl-5 product-detail-container">
              <div className="col-lg-5 w-fit-c mb-30 product-image-container">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                  <div className="bg-light">
                    <div className="carousel-item active product-image-section">
                      <img src={productData.image} alt="Image" />
                    </div>
                    {/* <div className="carousel-item">
                      <img src={productData.image} alt="Image" />
                    </div>
                    <div className="carousel-item">
                      <img src={productData.image} alt="Image" />
                    </div>
                    <div className="carousel-item">
                      <img src={productData.image} alt="Image" />
                    </div> */}
                  </div>
                  {/* <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                    <i className="fa fa-2x fa-angle-left text-dark" />
                  </a>
                  <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                    <i className="fa fa-2x fa-angle-right text-dark" />
                  </a> */}
                </div>
              </div>
              <div className="col-lg-7 h-auto mb-30">
                <div className="h-100 bg-light p-30 text-container">
                  <h3>{productData.productname}</h3>
                  <div className="d-flex mb-3">
                    <div className="text-primary mr-2">
                    {fifeArray.map((element,index)=>{
                                return(
                                  <i className={`${index<productData.rating.rate?"fas":"far"} fa-star star-2`} />
                                )
                              })}
                             
                    </div>
                    <small className="pt-1">{productData.rating.rate} Rating</small>
                    <small className="pt-1 mx-2">{productData.rating.count} Reviews</small>
                  </div>
                  <h3 className="font-weight-semi-bold mb-4">Price : {productData.price.toFixed(2)} &#x20B9;</h3>
                  {/* <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                    clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
                    Nonumy</p> */}
            
                  <div className="d-flex align-items-center mb-4 pt-2">
                    <div className="input-group quantity mr-3" style={{width: '158px', alignItems:'center'}}>
                      <div className="input-group-btn">
                        <button className="btn btn-primary btn-minus"  onClick={removeItem}>
                          <i className="fa fa-minus"/>
                        </button>
                      </div>
                      <input type="text" className="form-control bg-secondary border-0 text-center" value={addedItem} />
                      <div className="input-group-btn">
                        <button className="btn btn-primary btn-plus"  onClick={addItem}>
                          <i className="fa fa-plus"/>
                        </button>
                      </div>
                    </div>
                    <button className="btn btn-primary px-3" onClick={submitUserProductCart}><i className="fa fa-shopping-cart mr-1" /> <Link to={localStorage.getItem('userStatus')==='true'?'/productcart':'/account'}> Add To
                      Cart </Link></button>
                  </div>
                  {/* <div className="d-flex pt-2">
                    <strong className="text-dark mr-2">Share on:</strong>
                    <div className="d-inline-flex">
                      <a className="text-dark px-2" href>
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a className="text-dark px-2" href>
                        <i className="fab fa-twitter" />
                      </a>
                      <a className="text-dark px-2" href>
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a className="text-dark px-2" href>
                        <i className="fab fa-pinterest" />
                      </a>
                    </div>
                  </div> */}
                  <div className="row mt-5">
              <div className="col">
                <div className="bg-light">
                  <div className="nav nav-tabs mb-4">
                    <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-3">Reviews ({productData.rating.count})</a>
                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-1">Description</a>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade" id="tab-pane-1">
                      <h4 className="mb-3">Product Description</h4>
                      <p>{productData.description}</p>

                      <div className='brand-type'>
                      <strong>Brand</strong> : <span>{productData.Brand}</span>
                      <strong>Type</strong> : <span>{productData.Type}</span>
                      </div>
                    </div>
                   
                    <div className="tab-pane fade show active" id="tab-pane-3">
                      <div className="row">
                          <h4 className="mb-4">{productData.rating.count} review for {productData.productname}</h4>
                          <div className='review-thumb'>

       
                          {!readMoreStatus && <div className=" review-width">
                       {review && review.slice(0,3).map((data,index)=>{
                        return(
                          <div className="media mb-4">
                            <div className="media-body">
                            <h6>{data.username}<small> - <i>{new Date(data.date).toLocaleString()}</i></small></h6>
                            <div className="text-primary mb-2">
                              {fifeArray.map((element,index)=>{
                                return(
                                  <i className={`${index<data.rate?"fas":"far"} fa-star star-2`} />
                                )
                              })}
                             
                           
                              <span className='mx-2'>{data.rate} rating</span>
                            </div>
                            <p>{data.review}</p>
                          </div>
                       
                        </div>
                        )
                       })
                       }
                         
                          {review && review.length>3 && <span className='cursor-p' onClick={e=>setReadMoreStatus(true)}>Read More...</span>}
                        </div>
                       }

                            
                       {readMoreStatus &&  <div className=" review-height review-width">
                       { review.map(data=>{
                        return(
                          <div className="media mb-4">
                            <div className="media-body">
                            <h6>{data.username}<small> - <i>{data.date}</i></small></h6>
                            <div className="text-primary mb-2">
                              {fifeArray.map((element,index)=>{
                                return(
                                  <i className={`${index<data.rate?"fas":"far"} fa-star star-2`} />
                                )
                              })}
                             
                           
                              <span className='mx-2'>{data.rate}</span>
                            </div>
                            <p>{data.review}</p>
                          </div>
                        </div>
                        )
                       })
                       }

                      <span className='cursor-p' onClick={e=>setReadMoreStatus(false)}>Read Less</span>

                        </div>
                       }
                        <div className="review-width">
                          <h4 className="mb-4">Leave a review</h4>
                          <small>Your email address will not be published. Required fields are marked *</small>
                          <div className="d-flex my-3">
                            <p className="mb-0 mr-2">Your Rating * :</p>
                            <div className="text-primary">
                                <i className="far fa-star star" onClick={e=>addStar(1)}/>
                                <i className="far fa-star star" onClick={e=>addStar(2)}/>
                                <i className="far fa-star star" onClick={e=>addStar(3)}/>
                                <i className="far fa-star star" onClick={e=>addStar(4)}/>
                                <i className="far fa-star star" onClick={e=>addStar(5)}/>
                            </div>
                          </div>
                          <form>
                            <div className="form-group">
                              <label htmlFor="message">Your Review *</label>
                              <textarea id="message" name="review" onChange={(e=>{setReviewDetail({...reviewDetail,[e.target.name]:e.target.value})})}  cols={30} rows={5} className="form-control" defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Your Name *</label>
                              <input type="text" name="name" value={reviewDetail.username}  className="form-control" id="name" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">Your Email *</label>
                              <input type="email" name="email" value={reviewDetail.email} className="form-control" id="email" />
                            </div>
                            <div className="form-group mb-0">
                              <input type="submit" onClick={addReview} defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                            </div>
                          </form>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                </div>
              </div>
            </div>
          
          </div>
          {/* Shop Detail End */}
    
        
           {/* Products Start */}
           <div className="container-fluid py-5">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">You May Also Like</span></h2>
            <div className="row px-xl-5">
              <div className="col">
                <div className="Car you-may-also-like related-carousel">
                {sameProduct && sameProduct.length !== 0 ? sameProduct.slice(0,3).map((data, index) => {
const truncatedProductName = data.productname.slice(0, 30);
            return (
              <div className="card" key={index}>
                  <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}> 
                
             
                  <img src={data.image} className="card-img-top" alt="..." />
                  </Link>
     
               
                <div className="card-body">
                  <p className="card-text">

                    {truncatedProductName} ... ({data.age} years old)

                    <br />

                    <div className="review-section">
              {/* <div className="review-star">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div> */}
              <div className="review-check">
                {data.rating.count} review
              </div>
            </div>


                    <span class="money">{data.price} &#x20B9;</span>

                  </p>
                  {/* <Link to={localStorage.getItem('userStatus')==='true'?'/productcart':'/account'} */}
                  {/* <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productPrice', data.price); localStorage.setItem('productName', data.productname); localStorage.setItem('productImage', data.image) }}> <a className="btn  cart-btn"> */}
                  <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}> <a className="btn  cart-btn">
                    Add To Cart
                  </a></Link>
                </div>
              </div>
            )
          }) : <div>Sorry No such Data are Avaialble</div>}
                </div>
              </div>
            </div>
          </div>
          {/* Products End */}
        
        
        
        </>
      )
}

export default ProductDetails