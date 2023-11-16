import React, { useEffect } from 'react'
import c1 from "../images/crs1.jpg"
import c2 from "../images/crs2.jpg"
import c3 from "../images/crousel3.jpg"
export default function Banner() {
  

  return  (
    <>
    
    <div style={{width:"100vw"}} id="carouselExampleControls" className="carousel slide" data-mdb-ride="carousel">
        <div className="carousel-inner banner-container">
          <div className="carousel-item active">
            <img style={{height:"70vh"}} src={c1} className=" w-100 " alt="Wild Landscape" />
          </div>
          <div className="carousel-item">
            <img  style={{height:"70vh"}} src={c2} className=" w-100" alt="Camera" />
          </div>
          <div className="carousel-item">
            <img  style={{height:"70vh"}} src={c3} className=" w-100" alt="Camera" />
          </div>
        
        </div>
        <button className="carousel-control-prev crousel-btn" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next crousel-btn" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>






  

    
    </>
  )
}