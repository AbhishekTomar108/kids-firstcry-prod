import './css/style.css';
import './css/responsive.css';
import Header from './component/header';
import Bestseller from './component/bestseller';
import Blog from './component/Blog';
import Customers from './component/Customers';
import Banner from './component/Banner';
import Category from './component/Category';
import ReadMore from './component/ReadMore';
import Newsletter from './component/Newsletter';
import Footer from './component/Footer';
import Product from './component/Product/Product';
import Login from './component/loginSignup/Login';
// import Filter from './component/Product/Filter';

import {
  // BrowserRouter as Router,
  BrowserRouter,
  Routes,
  Route,
  HashRouter
 
} from "react-router-dom";
import SignUp from './component/loginSignup/SignUp';
import Parenting from './component/Parenting';
import Press from './component/Press';
import ProductDetails from './component/Product/ProductDetails';
import ProductCart from './component/Product/ProductCart';
import ProductCheckOut from './component/Product/ProductCheckOut';
import LoginState from './Context/LoginState';
import UserHome from './component/user/UserHome';
import UserCart from './component/user/UserCart';
import ShopByAge from './component/ShopByAge';
import ShopByCategory from './component/ShopByCategory';
import AddCommerceData from './component/AddCommerceData';
import PlacedProduct from './component/Product/PlacedProduct';




function App() {
  return (
    <div>
      <LoginState>
      <HashRouter>
        <Header/>
        <Routes>
        <Route  exact path="/account" element={<Login/>}/>
        <Route  exact path="/addProductData" element={<AddCommerceData/>}/>
        <Route  exact path="/user" element={<UserHome/>}/>
        <Route  exact path="/usercart" element={<UserCart/>}/>
        <Route  exact path="/signup" element={<SignUp/>}/>
        <Route  exact path="/categories" element={<Product/>}/>
        <Route  exact path="/age" element={<Product prouctTitle='Toys' prouctTitleDesc='Development-friendly play, the safe and sustainable way! Explore wooden toys, games and puzzles for ages 0 to 8. Made with love in India.'/>}/>
        <Route  exact path="/books" element={<Product prouctTitle='Kids Story Books - English & Hindi' prouctTitleDesc='Active play enables kids to build their gross motor skills, emotional intelligence and physical agility.'/>}/>
        <Route  exact path="/bestseller" element={<Product prouctTitle='Best Sellers Wooden Toys For Kids' prouctTitleDesc='Active play enables kids to build their gross motor skills, emotional intelligence and physical agility.'/>}/>
        <Route  exact path="/newArrivals" element={<Product prouctTitle='New Arrivals' prouctTitleDesc='Active play enables kids to build their gross motor skills, emotional intelligence and physical agility.'/>}/>
        <Route  exact path="/offers" element={<Product prouctTitle='Limited Time Offer on Curated Toys!' prouctTitleDesc='Active play enables kids to build their gross motor skills, emotional intelligence and physical agility.'/>}/>
        <Route  exact path="/giftsForAll" element={<Product prouctTitle='Return Gifts - Fun, Affordable Favorites' prouctTitleDesc='Active play enables kids to build their gross motor skills, emotional intelligence and physical agility.'/>}/>
        <Route  exact path="/parenting" element={<Parenting/>}/>
        <Route  exact path="/rewards" element={<Product/>}/>
        <Route  exact path="/productdetails" element={<ProductDetails/>}/>
        <Route  exact path="/productcart" element={<ProductCart/>}/>
        <Route  exact path="/proceedtocheckout" element={<ProductCheckOut/>}/>
        <Route  exact path="/placedproduct" element={<PlacedProduct/>}/>
        <Route  exact path="" element={[<Banner/>, <ShopByAge/>, <ShopByCategory/>, <Bestseller/>,<Category/>,<ReadMore/>, <Press/>,<Customers/>]}/>
        {/* <Route  exact path="/" element={<AddCommerceData/>}/> */}

       
        {/* <Banner/>
        <Bestseller/>
        <Category/>
        <Bestseller/>
        <ReadMore/>
        <Newsletter/>
        <Blog/>
        <Customers/> */}
        </Routes>
        <Footer/>

        </HashRouter>
        </LoginState>
    </div>
   
  );
}

export default App;
