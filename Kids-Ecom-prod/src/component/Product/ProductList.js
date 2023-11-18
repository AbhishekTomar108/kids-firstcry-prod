import React, { useEffect, useState, useContext } from "react";
import image1 from "../../images/img-1.png";
import { Link } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import cross from "../../images/cross.png";
// import image2 from "./image/MusicalTruck_460x.webp";
// import image3 from "./image/Walker__1__Square_460x.webp";
// import image from "./image/Collection_Page_Banner_-_Desktop-100.webp";

export default function ProductList(props) {
  const ContextValue = useContext(LoginContext);


  const [productdetails, setproductdetails] = useState();
  const [prouctTitle, setprouctTitle] = useState();
  const [prouctTitleDesc, setprouctTitleDesc] = useState();
  const [quickViewStatus, setquickViewStatus] = useState(false);
  const [bestSellerData, setbestSellerData] = useState();
  const [currentProduct, setCurrentProduct] = useState()

  const fifeArray = [0,1,2,3,4]

  useEffect(() => {

    fetchProductData();
    window.scrollTo({ top: 0 })
    console.log('useeffect of product list')


  }, [ContextValue.productname, ContextValue.filterProduct, ContextValue.filterProductByAge])

  const fetchProductData = async () => {


    // if(ContextValue.filterProduct===false)
    // {
    //   let filterdata = JSON.parse(localStorage.getItem("filterproductData"));
    //   setproductdetails(filterdata);
    //   setprouctTitle(filterdata[0].title)
    //   setprouctTitleDesc(filterdata[0].description)
    // }

    // else{
    let data = await fetch('http://localhost:8000/api/product/products');
    let parsedData = await data.json();


    if (localStorage.getItem('status') === "filterByAge") {
      console.log('filter status by age');

      let filterdata = JSON.parse(localStorage.getItem('filterProductAge'))
      ContextValue.updateFilterProductByAge(false);
      setproductdetails(filterdata);
      setprouctTitle(filterdata[0].category)
      setprouctTitleDesc(filterdata[0].description)

    }

    if (localStorage.getItem('status') === "filterdata") {
      console.log('filter status filter data');
      let filterdata = JSON.parse(localStorage.getItem("filterproductData"));
      console.log('filter from function =', filterdata)

      localStorage.setItem('currentProductData', JSON.stringify(filterdata))
      ContextValue.updateFilterProduct(false)
      setproductdetails(filterdata);
      setprouctTitle(filterdata[0].category)
      setprouctTitleDesc(filterdata[0].description)
    }

    if (localStorage.getItem('status') === "category") {
      console.log('category status category ');
      let filterdata = parsedData.filter(data => {
        return (data.category === localStorage.getItem('category'))
      })
      localStorage.setItem('currentProductData', JSON.stringify(filterdata))
      setproductdetails(filterdata);
      setprouctTitle(filterdata[0].category)
      setprouctTitleDesc(filterdata[0].description)
    }

    else if (localStorage.getItem('status') === "age") {
      console.log('age status age');
      let filterdata = parsedData.filter(data => {
        return (data.age === localStorage.getItem('age'))
      })
      console.log('filter ', filterdata)
      localStorage.setItem('currentProductData', JSON.stringify(filterdata))
      setproductdetails(filterdata);
      setprouctTitle(`${localStorage.getItem('age')} years`)
      setprouctTitleDesc(filterdata[0].description)
    }
    else if (localStorage.getItem('status') === "byproduct") {
      console.log('filter status by byproduct');

      if(localStorage.getItem('product')==="all")
      {
      setproductdetails(parsedData);
      setprouctTitle(parsedData[0].title)
      setprouctTitleDesc(parsedData[0].description)
      localStorage.setItem('currentProductData', JSON.stringify(parsedData))
      }
      else{
      let filterdata = parsedData.filter(data => {
        return (data.product === localStorage.getItem('product'))
      })
      localStorage.setItem('currentProductData', JSON.stringify(filterdata))
      console.log('filter data of product list=',filterdata)
      setproductdetails(filterdata);
      setprouctTitle(filterdata[0].title)
      setprouctTitleDesc(filterdata[0].description)
    }
    }



  }

  const showHideFilter = () => {

    const FilterContainer = document.getElementsByClassName('filter-container')[0];

    if (FilterContainer.style.display === 'none') {
      FilterContainer.style.display = 'block';
    }

    else {
      FilterContainer.style.display = 'none';
    }

  }

  const hideQuickView = () => {
    const quickViewProduct = document.querySelector(
      ".quick-view-product-container"
    );
    const bestsellerSection = document.querySelector(".bestseller-section");
    const overlay = document.getElementById("overlay");

    document.body.style.overflow = "auto";

    quickViewProduct.style.visibility = "hidden";
    overlay.style.display = "none";
    quickViewProduct.style.opacity = "0";
    quickViewProduct.style.height = "0";
    bestsellerSection.style.opacity = "1";
    // document.body.style.backgroundColor = "none";
    // document.body.style.opacity="1";
    bestsellerSection.style.background = "none";
    setquickViewStatus(false);
  };

  
  const quickViewProduct = (image, productname) => {
    const quickViewProduct = document.querySelector(
      ".quick-view-product-container"
    );
    const bestsellerSection = document.querySelector(".bestseller-section");
    const overlay = document.getElementById("overlay");

    document.body.style.overflow = "hidden";

    quickViewProduct.style.visibility = "visible";
    overlay.style.display = "block";
    quickViewProduct.style.opacity = "1";
    quickViewProduct.style.height = "auto";
    bestsellerSection.style.opacity = "0.3";
    // document.body.style.backgroundColor = "black";
    // document.body.style.opacity="0.3";
    bestsellerSection.style.background = "black";
  };

  return (
    <>

      <div>

      <div className="quick-view-product-container">
          <div className="container-fluid pb-5">
            <div className="quick-view-row row px-xl-5 w-100">
              <div className="bestseller-col-lg-5 col-lg-5 mb-30">
                <div
                  id="product-carousel"
                  style={{ height: "100%" }}
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div
                    className="carousel-inner bg-light"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="carousel-item active quick-view-image-section"
                      style={{ height: "100%" }}
                    >
                      <img
                        className="h-100"
                        src={localStorage.getItem("productImage")}
                        alt="Image"
                      />
                    </div>
                    {/* <div className="carousel-item" style={{ height: "100%" }}>
                      <img
                        className="w-100 h-100"
                        src={localStorage.getItem("productImage")}
                        alt="Image"
                      />
                    </div>
                    <div className="carousel-item" style={{ height: "100%" }}>
                      <img
                        className="w-100 h-100"
                        src={localStorage.getItem("productImage")}
                        alt="Image"
                      />
                    </div>
                    <div className="carousel-item" style={{ height: "100%" }}>
                      <img
                        className="w-100 h-100"
                        src={localStorage.getItem("productImage")}
                        alt="Image"
                      />
                    </div> */}
                  </div>
              
                </div>
              </div>
              <div className="bestseller-col-lg-7 col-lg-7 pos-rel h-auto mb-30">
                <img
                  className="cross-quick-view"
                  src={cross}
                  onClick={hideQuickView}
                />
                <div className="h-100 bg-light p-30 product-name">
                  <h3 style={{ textAlign: "initial" }}>
                    {localStorage.getItem("productName")}
                  </h3>
                  {console.log(localStorage.getItem("productName"))}
                  <div className="d-flex mb-3">
                    <div className="text-primary mr-2">

                    {currentProduct && fifeArray.map((element,index)=>{
                                return(
                                  <i className={`${index<currentProduct.rating.rate?"fas":"far"} fa-star star-2`} />
                                )
                              })}
                     
                    </div>
                   
                   {currentProduct && <small className="pt-1">({currentProduct.rating.count }) review</small>}
                  </div>
                  <h3
                    style={{ textAlign: "initial" }}
                    className="font-weight-semi-bold mb-4"
                  >
                    Price : {localStorage.getItem("productPrice")} &#x20B9;
                  </h3>
                  
                  {/* <div className="d-flex mb-3">
                    <strong className="text-dark mr-3 strong-text">Sizes:</strong>
                    <form>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="size-1" name="size" />
                        <label className="custom-control-label" htmlFor="size-1">XS</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="size-2" name="size" />
                        <label className="custom-control-label" htmlFor="size-2">S</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="size-3" name="size" />
                        <label className="custom-control-label" htmlFor="size-3">M</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="size-4" name="size" />
                        <label className="custom-control-label" htmlFor="size-4">L</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="size-5" name="size" />
                        <label className="custom-control-label" htmlFor="size-5">XL</label>
                      </div>
                    </form>
                  </div> */}
                  {/* <div className="d-flex mb-4">
                    <strong className="text-dark mr-3 strong-text">Colors:</strong>
                    <form>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="color-1" name="color" />
                        <label className="custom-control-label" htmlFor="color-1">Black</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="color-2" name="color" />
                        <label className="custom-control-label" htmlFor="color-2">White</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="color-3" name="color" />
                        <label className="custom-control-label" htmlFor="color-3">Red</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="color-4" name="color" />
                        <label className="custom-control-label" htmlFor="color-4">Blue</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="color-5" name="color" />
                        <label className="custom-control-label" htmlFor="color-5">Green</label>
                      </div>
                    </form>
                  </div> */}
                  <div className="d-flex align-items-center mb-4 pt-2">
                    {/* <div className="input-group quantity mr-3" style={{width: '158px', alignItems:'center'}}>
                      <div className="input-group-btn">
                        <button className="btn btn-warning btn-minus"  >
                          <i className="fa fa-minus"/>
                        </button>
                      </div>
                      <input type="text" className="form-control bg-secondary border-0 text-center" value="1" />
                      <div className="input-group-btn">
                        <button className="btn btn-warning btn-plus">
                          <i className="fa fa-plus"/>
                        </button>
                      </div>
                    </div> */}
                    <button className="btn btn-warning px-3">
                      <i className="fa fa-shopping-cart mr-1" />{" "}
                      <Link
                        to="/productdetails"
                        onClick={() => (document.body.style.overflow = "auto")}
                      >
                        {" "}
                        Add To Cart{" "}
                      </Link>
                    </button>
                  </div>
                  <div className="d-flex pt-2 my-2 share-thumb">
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
                  </div>

                  <div className='brand-type'>
              {currentProduct  &&  
              <>
               <strong className="brand-type">Brand</strong> : <span className="brand-type">{currentProduct.Brand}</span>
               <strong className="brand-type">Type</strong> : <span className="brand-type">{currentProduct.Type}</span>
               </>}
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text">
          <h1 style={{ fontSize: "30px" }}>{ContextValue.productname==="all"?"Gifts For All Ages":ContextValue.productname==="Used Breast Pump"?"Breast Pump":ContextValue.productname} Collection</h1>
          <hr></hr>

          <p style={{ textAlign: "center" }}>
            {/* {prouctTitleDesc && prouctTitleDesc}  */}
          </p>
        </div>
        <div className="filter-text-container" onClick={showHideFilter}>
          <div className="filter-sign-container">
            <div className="sign-line"></div>
            <div className="sign-line"></div>
          </div>
          <div className="filer-text">Filter</div>
        </div>

        <div className="Active Product-list-card-container">

          {productdetails && productdetails.length !== 0 ? productdetails.map((data, index) => {
            const truncatedProductName = data.productname.slice(0, 30);
            return (
            //   <div className="card" key={index}>
            //       <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}> 
                
             
            //       <img src={data.image} className="card-img-top" alt="..." />
            //       </Link>
     
               
            //     <div className="card-body">
            //       <p className="card-text">

            //         {truncatedProductName} ... ({data.age} years old)

            //         <br />

            //         <div className="review-section">
            //   {/* <div className="review-star">
            //     <span className="fa fa-star checked"></span>
            //     <span className="fa fa-star checked"></span>
            //     <span className="fa fa-star checked"></span>
            //     <span className="fa fa-star"></span>
            //     <span className="fa fa-star"></span>
            //   </div> */}
            //   <div className="review-check">
            //     {data.rating.count} review
            //   </div>
            // </div>


            //         <span class="money">{data.price} &#x20B9;</span>

            //       </p>
            //       {/* <Link to={localStorage.getItem('userStatus')==='true'?'/productcart':'/account'} */}
            //       {/* <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productPrice', data.price); localStorage.setItem('productName', data.productname); localStorage.setItem('productImage', data.image) }}> <a className="btn  cart-btn"> */}
            //       <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}> <a className="btn  cart-btn">
            //         Add To Cart
            //       </a></Link>
            //     </div>
            //   </div>

            <div className="col-md-4 mb-3 product-card">
            <div className="card">
              <div className="image-add-to-cart-conatiner">
                <img
                  className="img-fluid"
                  alt="100%x280"
                  src={data.image}
                />

                <div className="add-to-cart-dropdown-container product-dropdwon">
                  <button
                    className="quick-add-to-btn"
                    onClick={() => {
                      quickViewProduct(
                        data.image,
                        data.productname
                      );
                      localStorage.setItem(
                        "productPrice",
                        data.price
                      );
                      localStorage.setItem(
                        "productName",
                        data.productname
                      );
                      localStorage.setItem(
                        "productImage",
                        data.image
                      );
                      setquickViewStatus(true);
                      setCurrentProduct(data)
                    }}
                  >
                    Quick View
                  </button>

                  <Link
                    to="/productdetails"
                    onClick={() => {
                      localStorage.setItem(
                        "productPrice",
                        data.price
                      );
                      localStorage.setItem(
                        "productName",
                        data.productname
                      );
                      localStorage.setItem(
                        "productImage",
                        data.image
                      );
                    }}
                  >
                <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}>

                    <button className="quick-add-to-btn">
                      Add to Cart
                    </button>
                    </Link>
                  </Link>
                </div>
              </div>

              <div id="overlay"></div>
               {/* bestseller quick overview container end */}
      <div className="bestseller-section">
      
       
        {/* <div className='separator-image'></div> */}
    
      </div>
              <span className="card-title py-10">
                {truncatedProductName}...({data.age}years)
              </span>
              
                <div className="review-section py-10">
                <div className="price-section py-10">
                  <span className="current-price">
                    {data.price} &#x20B9;
                  </span>
                </div>
                  <div className="review-check">
                    {data.rating.count} review
                  </div>
                </div>
               

                <Link to={localStorage.getItem('userStatus')==='true'?'/productdetails':'/account'} onClick={() => { localStorage.setItem('productData', JSON.stringify(data))}}> <button className="btn  cart-btn">
                 Add To Cart </button></Link>
              

            </div>
          </div>
            )
          }) : <div>Sorry No such Data are Avaialble</div>}




        </div>
      </div>

    </>
  );
}