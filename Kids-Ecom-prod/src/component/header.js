import React, {useContext, useEffect, useState} from 'react'
import headerLogo from '../images/Firstcrystore.png'
import cart from '../images/cart.png'
import search from '../images/search.png'
import user from '../images/user.png'
import cross from '../images/cross.png'
import { Link } from "react-router-dom";
import LoginContext from '../Context/LoginContext'
import downArrow from '../images/down-arrow.png'


const Header = () => {
    const ContextValue = useContext(LoginContext);
    const [previousIndex, setpreviousIndex] = useState(0);
    const [searchitem, setSearchItem] = useState('')
    const [filterData, setfilterData]  = useState();
    const [filterStatus, setFilterStatus] = useState(true)

    useEffect(()=>{

        
   if(searchitem!==""){
    fetch(`http://localhost:8000/api/product/products/`).then(res=>res.json()).then(data=> {const filteredDtata = data.filter(element=>{ return (element.productname.toLowerCase().includes(searchitem,0) || element.category.toLowerCase().includes(searchitem,0))})
    
    setfilterData(filteredDtata)
    ContextValue.updateSearchQuery(searchitem)
    setFilterStatus(true)
    localStorage.setItem('filterproductData', JSON.stringify(filteredDtata));       
  
})
   }

    },[ContextValue.productname, searchitem])


    const showProduct = (index)=>{
        if(window.innerWidth>900)
        {
        const currentProductList = document.getElementsByClassName('dropdown-product-list')[index];
        const previousProductList = document.getElementsByClassName('dropdown-product-list')[previousIndex];

        previousProductList.style.visibility= 'hidden';
        currentProductList.style.visibility= 'visible';
        
        setpreviousIndex(index);
        }
    }

    const showProductOnClick = (index) => {
        if(window.innerWidth<900)
        {
        const currentProductList = document.getElementsByClassName('dropdown-product-list')[index];
        const previousProductList = document.getElementsByClassName('dropdown-product-list')[previousIndex];

        previousProductList.style.visibility= 'hidden';
        currentProductList.style.visibility= 'visible';
        
        setpreviousIndex(index);
        }
    }

    const hideProduct = ()=>{
        const currentProductList = document.getElementsByClassName('dropdown-product-list')[previousIndex];

        currentProductList.style.visibility= 'hidden';

        
    }

    const ShowHideCategories = ()=>{
        const Categories = document.getElementsByClassName('categories-container')[0];
        console.log('Categories input =',Categories)
        console.log('Categories input =',Categories.style)
        console.log('Categories input =',Categories.style.display)
        if(Categories.style.display === "block")
        {
            Categories.style.display = "none";
        }
        else{
            Categories.style.display = "block";
        }
       
    }

    const removeSearch = ()=>{
        console.log('remove search running')
        if(filterData!==null){
            console.log('if running')
            setfilterData(null)
            setSearchItem('')
            ContextValue.updateFilterProduct(false);

            // setSearchItem('')
           
        }
    }

    const showSearchBar = ()=>{
        console.log('seacrh input running')
        const searchInput = document.getElementsByClassName('search_input_div_input')[0]
        const headerContainer = document.getElementsByClassName('header-container')[0]
        const crossSearchBar = document.getElementsByClassName('cross-to-search-bar')[0]
        console.log('style input =',searchInput)
        console.log('style input =',searchInput.style)
        console.log('style input =',searchInput.style.display)

        const computedStyle = window.getComputedStyle(searchInput);
        console.log('computedStyle =',computedStyle.display)

        if(computedStyle.display==="none"){

            console.log('if seacrh input running')
            crossSearchBar.style.display="inline"
            searchInput.style.display="block"
            headerContainer.style.flexDirection = "column"
        }
    }

    const hideSearchBar  =()=>{
        const searchInput = document.getElementsByClassName('search_input_div_input')[0]
        const headerContainer = document.getElementsByClassName('header-container')[0]

        searchInput.style.display="none"
        headerContainer.style.flexDirection = "row"
    }

    const selectQuery = ()=>{

        console.log("select query")
        ContextValue.updateFilterProduct(true);
        setfilterData(null);
        setFilterStatus(false)
        setSearchItem("");
        ContextValue.updateAge("allAge","notAge");
        ContextValue.updateFullAgeStatus(true)
        // document.querySelector('.search_result').style.display = "none"
        
    }

  return (
    <div className='header'>
        <div className='header-container'>
            <div className='search-hamburger-container'>
                <div className='hamburger-container' onClick={ShowHideCategories}>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </div>
            {/* <div className='search-container'>
                <div className='search-input'>
                <img src={search}/>
                <input type='text' placeholder='Search' onChange={e=>setSearchItem(e.target.value)}></input>
                </div>
            </div> */}

            <section className='search_section'>
            <div className='  search_input_div'>
                <div className=' search_input_div_input'><input
                    type='text'
                    placeholder='Search...'
                    autoComplete='off'
                    value={searchitem}
                    onChange={e=>setSearchItem(e.target.value)}
                />
                    <img className='cross-to-search-bar' onClick={hideSearchBar} src={cross}/>
                </div>
                {/* <div className='search_icon ' onClick={showSearchBar}> */}
                <img className='search-cross-icon' onClick={filterData?removeSearch:showSearchBar} src={filterData?cross:search}/>
                  
                {/* </div> */}
            </div>
            <div className='search_result' >
           {filterStatus && 
           (filterData && filterData.map((data,index)=>{
            return (
                    
                // <Link to='categories' onClick={()=>{ContextValue.updateFilterProduct(true);setfilterData(null)}}><a target='_blank' className='search_suggestion_line' key={index}>
                //     {data.productname}
                // </a></Link>
                <Link to='categories' onClick={()=>selectQuery()}><a target='_blank' className='search_suggestion_line' key={index}>
                    {data.productname}
                </a></Link>
         
            )
           }) )
           }
              </div>
        </section>
            </div>

            <div className='header-img'>
               <Link to='/'> <img src={headerLogo}/></Link>
            </div>

            <div className='account-cart-container'>
                <ul>
              
                <Link to={ localStorage.getItem('username')?"user":'account'}> <li><span>{ localStorage.getItem('username')? localStorage.getItem('username'):"Account"}</span>
                    <img className='user-img icon' src={user}/>
    
                    </li></Link>
                    <Link to='usercart'><li id='cart'><span>Cart</span> <img className='icon' src={cart}/></li></Link>
                </ul>
            </div>
        </div>

        <div className='categories-container' onMouseLeave={hideProduct}>
            <hr></hr>
            <img className='cross' onClick={ShowHideCategories} src={cross}/>
            <div className='categories'>
            <div className='top-cotegories hover-product-list y-gap' onMouseOver={()=>showProduct(0) }  onClick={()=>showProductOnClick(0)} >Accessories <img src={downArrow} className='down-arrow'/>
            <div className='accesory-list-container dropdown-product-list' onMouseOver={()=>showProduct(0)}>
               <ul>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Used Breast Pump");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Breast Pump</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby Bed With Net");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby Bed With Net</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby Cradle Automatic Swing");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby Cradle Automatic Swing</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Mothertouch Walker");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Mothertouch Walker</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Babyhug Car Seat");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Babyhug Car Seat</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Cradle Swing");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Cradle Swing</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Electric Baby Swing");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Electric Baby Swing</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby palna");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby palna</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby Bouncer and Rocker");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby Bouncer and Rocker</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby Booster Chair");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby Booster Chair</li></Link>
                </ul> 
            </div>
               
                </div>

                <div className='top-age hover-product-list y-gap' onMouseOver={()=>showProduct(1)} onClick={()=>showProductOnClick(1)}>Toys  <img src={downArrow} className='down-arrow'/>
                <div className='toys-list-container dropdown-product-list' onMouseOver={()=>showProduct(1)}>
               <ul>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Prongo Educational");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Prongo	Educational</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Car Bed For Kids");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Car Bed For Kids</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby House Toy");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby House Toy</li></Link>
                </ul> 
            </div>
                
                </div>
                <div className='top-age hover-product-list y-gap' onMouseOver={()=>showProduct(2)} onClick={()=>showProductOnClick(2)}>  Diapers  <img src={downArrow} className='down-arrow'/>
                <div className='diapers-list-container dropdown-product-list' onMouseOver={()=>showProduct(2)}>
               <ul>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("xxxl Diapers");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>xxxl Diapers</li></Link>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Mamy Poko Pants xxxl");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Mamy Poko Pants xxxl</li></Link>
                </ul> 
            </div>
                </div>

                 <div className='y-gap hover-product-list' onMouseOver={()=>showProduct(3)} onClick={()=>showProductOnClick(3)}>Cot  <img src={downArrow} className='down-arrow'/>
                 <div className='diapers-list-container dropdown-product-list' onMouseOver={()=>showProduct(3)}>
               <ul>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Wooden Baby Cot");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Wooden Baby Cot</li></Link>
                
                </ul> 
            </div>
                 </div>
                <div className='y-gap hover-product-list' onMouseOver={()=>showProduct(4)} onClick={()=>showProductOnClick(4)}>Jacket  <img src={downArrow} className='down-arrow'/>
                <div className='diapers-list-container dropdown-product-list' onMouseOver={()=>showProduct(4)}>
               <ul>
               <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Baby Girl Jacket");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Baby Girl Jacket</li></Link>
                
                </ul>
                </div>
                </div>
                <div className='y-gap hover-product-list' onMouseOver={()=>showProduct(5)} onClick={()=>showProductOnClick(5)}>Stroller <img src={downArrow} className='down-arrow'/>
                <div className='diapers-list-container dropdown-product-list' onMouseOver={()=>showProduct(5)}>
               <ul>
             
                <Link to='categories'><li onClick={()=>{ContextValue.updateproductname("Babyhug Stroller");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}>Babyhug Stroller</li></Link>
                
                </ul>
                </div>
                </div>
                <div className='y-gap' onClick={()=>{ContextValue.updateproductname("all");ContextValue.updateAge("allAge","notAge");ContextValue.updateFullAgeStatus(true)}}><Link to='categories'>Gifts For All Ages</Link></div>
                <div className='y-gap'><Link to={localStorage.getItem('userStatus')==="true"?'/placedproduct':'/account'}>Placed Product</Link></div>
            </div>

           

            <hr></hr>

            

          
        </div>
    </div>
  )
}

export default Header