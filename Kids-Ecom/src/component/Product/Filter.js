import React, {useEffect, useState, useContext} from 'react'
import down from '../../images/down-arrow.png'
import LoginContext from '../../Context/LoginContext'
import { Link } from "react-router-dom";

const Filter = () => {
    const ContextValue = useContext(LoginContext);

    const colorArray = ['#618d80','#0f261f','#d0932b','#980000','#ebada8','#232b61','#6d1731','#000000','#4d4640','#63705c','#eacdd3','#889e94','#857e80','#091322','#dbc874','#92afbe','#ffffff','#0f261f','#4d0e1f','#9fe6e5','#767874','#a0bdb9','#40422a','#dde0e5','#ecbb9b','#f3f2ee','#b0a8a2','#575457','#7a293a','#193a41','#8b8f67','#382e25','#7b5e34','#373123','#525d4a','#233b51','#f8cf95','#0f261f','#545351','#93b9b4','#111728','#d0d3be','#000000','#ccd9cf','#7b2a23','#6f6f6f','#848a93','#444444','#52625d','#2d3949','#857270','#985f66','#93656f','#8bb4b0','#abced8','#354332','#e0bfbf','#4a4a4e','#586c69','#d1cfaa','#c8c4bb','#1e222c','#28355b','#df8281','#8a666d','#bdbdbd','#e47b5a','#434738','#8b9094','#978971','#25395d','#7f94ad','#3b4742','#515451','#433931','#5f4043','#c07e8c','#afdee7','#f3e4d6','#c1af7f','#553544','#cab9c3','#c8b08e','#d0d5d8','#816c4f','#50564c','#344a5f','#717775','#828f71','#3a1325']

    const color='#3a1325';

    useEffect(()=>{
        const color = '#3a1325';

        console.log('product is running')
    },[]) 

    const showColor = (index)=>{
        const Color = document.getElementsByClassName('filter-content-section')[index];
        if(Color.style.display === 'none')
        {
        
        Color.style.display = 'grid';
       
        }
        else{
            Color.style.display = 'none';
           
        }
    }

    const setAgeFilter = (age)=>{
        localStorage.setItem('age',age);
        localStorage.setItem('status',"filterByAge");
        let currentProduct  = JSON.parse(localStorage.getItem('currentProductData'));
 
        // console.log('set age filter =',currentProduct)

        currentProduct = currentProduct.filter(data=>
            {return(
                data.age===age
    )})

    localStorage.setItem('filterProductAge',JSON.stringify(currentProduct));


    }
  return (
  

        <div className='filter-container'>

            <div className='filter-text'>
                <h2>Filter</h2>
            </div>
{/* 
            <div className='color-container'>
                <div className='text-section'>
                <h2>Out of Stock</h2>
               
                    <img className='drop-down-arrow' onClick={()=>showColor(0)} src={down}/>
                    </div>

                    <div className='stock-container filter-content-section'>
                        <div className='show-text'><span>Show</span></div> 
                        <div className='hide-text'></div><span>Hide</span>
                    </div>
                  
               <div className='color-section filter-content-section'>
                {
                    colorArray.map((data,index)=>{
                        return(
                            <div className='color-circle' key={index} style={{background:data}}></div>
                        )
                    })
                }
                </div>
            
            </div> */}

            <div className='size-container'>
            <div className='text-section'>
                <h2>Years</h2>
               
                    <img className='drop-down-arrow' onClick={()=>showColor(0)} src={down}/>
                    </div>
                <ul className='filter-content-section'>
                    <li onClick={()=>{setAgeFilter("0-1"); ContextValue.updateFilterProductByAge(true)}}>0-1 years</li>
                    <li onClick={()=>{setAgeFilter("2-1"); ContextValue.updateFilterProductByAge(true)}}>1-2 years</li>
                    <li onClick={()=>{setAgeFilter("2-3"); ContextValue.updateFilterProductByAge(true)}}>2-3 years</li>
                    <li onClick={()=>{setAgeFilter("3-4"); ContextValue.updateFilterProductByAge(true)}}>3-4 years</li>
                    {/* <li onClick={()=>{setAgeFilter("4+"); ContextValue.updateFilterProductByAge(true)}}>4+ years</li>                   */}
                </ul>
            </div>

            {/* <div className='price-container'>
            <div className='text-section'>
                <h2>Price</h2>
               
                    <img className='drop-down-arrow' onClick={()=>showColor(2)} src={down}/>
                    </div>
                <div className='price-box filter-content-section'>
                    <div className='low-to-high'>
                        <input type='checkbox'></input>
                        Price : Low to High
                    </div>
                    <div className='High-to-Low'>
                        <input type='checkbox'></input>
                        Price : High to Low
                    </div>
                </div>
            </div> */}
        </div>

        
   
  )
}

export default Filter