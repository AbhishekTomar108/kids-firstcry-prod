import React, { useState , useEffect} from 'react'
import star from '../images/blue-star.png'
import productImg1 from '../images/product-img-1.png'
import leftArrow from '../images/left-arrow.png'
import rightArrow from '../images/right-arrow.png'

const Customers = () => {
    const [currentposition, setcurrentposition] = useState(3);
    const [currentWidth, setcurrentWidth] = useState(0);
    const [intervalStatus, setIntervalStatus] = useState(true);
    const [latestReview, setLatestReview] = useState()
    const [totalReview, setTotalReview] = useState()
    const [productData, setProductData] = useState()

    const fifeArray = [0,1,2,3,4]


    React.useEffect(()=>{

        const customCard = document.getElementsByClassName('custom-card');
        const totalItem = customCard.length;
        const reviewCard = document.getElementsByClassName('review-cards')[0];

        let position = 3;
        let movingWidth = 0;
        let timer = null;

        getLatestReview()

        if(intervalStatus){
         timer = window.setInterval(()=>{

             
        if(position<totalItem){
            
            if(document.documentElement.clientWidth>900)
            {
           
            movingWidth = movingWidth+100;
            reviewCard.style.transform = `translateX(-${movingWidth}%)`
            
             position = position+3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
            }

            else if(document.documentElement.clientWidth<=900)
            {
            movingWidth = movingWidth+75;
            reviewCard.style.transform = `translateX(-${movingWidth}vw)`
            
             position = position+3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
            }
        }
        else{
            
             movingWidth = 0;
            reviewCard.style.transform = `translateX(${movingWidth}%)`
            
             position = 3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
        }
        },2000)
    }
    else{
        window.clearInterval(timer);
    }

        return ()=>window.clearInterval(timer);
    },[intervalStatus])

    useEffect(()=>{

        getLatestReview()

    },[])

    const getLatestReview = async()=>{
        let ReviewData = await fetch('http://localhost:8000/api/product/getLatestReview',{
            method:'GET',
           headers:{"Content-Type":"application/json"}
        })
        ReviewData = await ReviewData.json()

        setLatestReview(ReviewData.latestReview)
        console.log('latest review of products= ',ReviewData.latestReview)
        setTotalReview(ReviewData.totalCount)
        setProductData(ReviewData.productData)


    }


    const autoScrollCard = ()=>{       
       
        const customCard = document.getElementsByClassName('custom-card');
        const totalItem = customCard.length;
        const reviewCard = document.getElementsByClassName('review-cards')[0];

        let position = 3;
        let movingWidth = 0;

        window.setInterval(()=>{

             
        if(position<totalItem){

            if(document.documentElement.clientWidth>900)
            {
           
            movingWidth = movingWidth+100;
            reviewCard.style.transform = `translateX(-${movingWidth}%)`
            
             position = position+3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
            }

            else if(document.documentElement.clientWidth<=900)
            {
              
            movingWidth = movingWidth+75;
            reviewCard.style.transform = `translateX(-${movingWidth}vw)`
            
             position = position+3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
            }
        }
        else{
            
             movingWidth = 0;
            reviewCard.style.transform = `translateX(${movingWidth}%)`
            
             position = 3;
            setcurrentposition(position)
            setcurrentWidth(movingWidth)
        }
        },2000)
    }

    const moveReviewCardRight = ()=>{
        
        const customCard = document.getElementsByClassName('custom-card');
        const totalItem = customCard.length;
        const reviewCard = document.getElementsByClassName('review-cards')[0];

        
        if(currentposition<totalItem){

          
            const moveWidth = currentWidth+100;
            reviewCard.style.transform = `translateX(-${moveWidth}%)`
            
            const addposition = currentposition+3;
            setcurrentposition(addposition)
            setcurrentWidth(moveWidth)
        }
        else{
            
            const moveWidth = 0;
            reviewCard.style.transform = `translateX(${moveWidth}%)`
            
            const addposition = 3;
            setcurrentposition(addposition)
            setcurrentWidth(moveWidth)
        }

        
    }

    const moveReviewCardLeft = ()=>{

        const customCard = document.getElementsByClassName('custom-card');
        const totalItem = customCard.length;
        const reviewCard = document.getElementsByClassName('review-cards')[0];

        
        
        if(currentposition>3){

            const moveWidth = currentWidth-100;
            reviewCard.style.transform = `translateX(-${moveWidth}%)`
            
            const addposition = currentposition-3;
            setcurrentposition(addposition)
            setcurrentWidth(moveWidth)
        }
        else{
            
            const moveWidth =( (totalItem/3)*100)-100;
            reviewCard.style.transform = `translateX(-${moveWidth}%)`
            
            const addposition = totalItem;
            setcurrentposition(addposition)
            setcurrentWidth(moveWidth)
        }
    }
  return (
    <div>
        <div className='customer-review-container'>
            <h2>Let customers speak for us</h2>
            <div className='total-review'>
             
                                <div className='review-text'>
                                    From {totalReview} reviews
                                </div>
            </div>

            <div className='review-card-container'>

                <div className='review-cards'>

                   { latestReview && latestReview.map((data,index)=>{
                    let truncatedProductName
                 if (productData[index].productname.length > 50) {
                    truncatedProductName = productData[index].productname.slice(0, 40) + '...';
                } else {
                    truncatedProductName = productData[index].productname;
                }
                    return (
                    <div className='custom-card'>
                    <div className='star-group'>
                    {fifeArray.map((element,index)=>{
                                return(
                                  <i className={`${index<data.rate?"fas":"far"} fa-star star-2`} />
                                )
                              })}
                                </div> 
                                <div className='review-content'>
                                <span className='review-title'>{data.review}</span>
                                
                                </div>

                            <div className='review-person'>
                                <span>{data.username}</span>
                                <span>{new Date(data.date).toLocaleDateString()}</span>
                            </div>

                            <div className='product-details'>
                                <div className='product-image'>
                                <img  src={productData[index].image}/>
                                </div>
                                <span>{truncatedProductName}</span>
                            </div>
                    </div> 
                    )
                   }) }                  
                </div>

                <div className='arrow-container'>
                    <div className='left-arrow arrow-img' onClick={()=>{moveReviewCardLeft();setIntervalStatus(false)}}>
                        <img src={leftArrow}/>
                    </div>
                    <div className='right-arrow arrow-img' onClick={()=>{moveReviewCardRight();setIntervalStatus(false)}}>
                        <img src={rightArrow}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Customers