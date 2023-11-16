import React from 'react'
import image from "../images/img-1.png";

export default function Parenting() {
    return (
        <>
            <h2>Simplifying Parenting</h2>
            <div className='blog-container'>
                <div className="blog-card">
                  
                        <img src={image} className="card-img-top" alt="..." />
                        <h2>Playing with colours — How does it help babies and toddlers?</h2>
                
                    <div className='blog-text'>
                        <h6>All you need to know about colours & play!</h6>
                        <div className='tag-section'>
                        <span>March 29, 2023 — Soumya John <br />Tags :</span>
                       
                           <span>6-9 Months 9-12 Months babies cognitive skills colours preschoolers toddlers</span>
                       
                        </div>
                    </div>
                </div>
                <div className="blog-card">
              
                        <img src={image} className="card-img-top" alt="..." />
                        <h2>Playing with colours — How does it help babies and toddlers?</h2>
                  
                    <div className='blog-text'>
                        <h6>All you need to know about colours & play!</h6>
                        <div className='tag-section'>
                        <span>March 29, 2023 — Soumya John <br />Tags :</span>
                       
                           <span>6-9 Months 9-12 Months babies cognitive skills colours preschoolers toddlers</span>
                       
                        </div>
                    </div>
                </div>
                <div className="blog-card">
               
                        <img src={image} className="card-img-top" alt="..." />
                        <h2>Playing with colours — How does it help babies and toddlers?</h2>
                  
                    <div className='blog-text'>
                        <h6>All you need to know about colours & play!</h6>
                        <div className='tag-section'>
                        <span>March 29, 2023 — Soumya John <br />Tags :</span>
                       
                           <span>6-9 Months 9-12 Months babies cognitive skills colours preschoolers toddlers</span>
                       
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}