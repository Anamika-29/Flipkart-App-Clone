import React, { useState } from "react";
import Navbar from "./navbar";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ProductDetails from "./product";
import All from "./all";
import AllMob from "./allMob";
import MobileDetails from "./mobileDetails";
import Cart from "./cart";
import CompareMobiles from "./compareMobiles";
import LoginPage from "./login";
import Wishlist from "./wishlist";
import Logout from "./logout";
function MainComponent(){
    const [cart,updateCart] = useState([]);
    const [arr,updateArr] = useState([]);
    const [wishlist,setWishlist] = useState([]);
    const addToCart = (prod) =>{
        let cart2 = [...cart];

        let index = cart2.findIndex(ele=>ele.name===prod.name);
        if(index>=0){
            cart2[index].quantity++;
        }
        else{
        cart2.push(prod);
    }
        updateCart(cart2);
    }

    const increase = (prod) =>{
        let cart2 = [...cart];

        let index = cart2.findIndex(ele=>ele.name===prod.name);
            cart2[index].quantity++;
        updateCart(cart2);

    }

    const decrease = (prod) =>{
        let cart2 = [...cart];
        

        let index = cart2.findIndex(ele=>ele.name===prod.name);
        if(cart2[index].quantity===1){
            cart2.splice(index,1);
        }
        else{
            cart2[index].quantity--;
        }
        updateCart(cart2);

    }
    const remove = (prod) =>{
        let cart2 = [...cart];

        let index = cart2.findIndex(ele=>ele.name===prod.name);
            cart2.splice(index,1);
        updateCart(cart2);

    }
    const removeComp = (prod) =>{
        let comp2 = [...arr];

        let index = comp2.findIndex(ele=>ele.name===prod.name);
            comp2.splice(index,1);
        updateArr(comp2);

    }

    const removeFromWish = (ele) => {
        const updatedWishlist = wishlist.filter((item) => item.name !== ele.name);
        setWishlist(updatedWishlist);
      };
      

return(<div className="bg-light">
    <Navbar cart={cart}/>
    

    <Switch>
        <Route path="/product/:id" render={(props) => <ProductDetails {...props} addToCart={addToCart} />} />
        <Route path="/mobile/:id" render={(props) => <MobileDetails {...props} addToCart={addToCart}  />} />
        <Route path="/allMobiles" render={(props) => <AllMob {...props} updateArr={updateArr} wishlist={wishlist} setWishlist={setWishlist}  />} />
        <Route path="/cart" render={(props) => <Cart {...props} cart={cart} increase={increase} decrease={decrease} remove={remove} />} />
        <Route path="/compareMobiles" render={(props) => <CompareMobiles {...props} arr={arr} addToCart={addToCart} remove={removeComp} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} arr={arr} addToCart={addToCart} remove={removeComp} />} />
        <Route path="/wishlist" render={(props) => <Wishlist {...props} wishlist={wishlist} remove={removeFromWish} />} />
        <Route path="/logout" render={(props) => <Logout {...props}  />} />

        <Route path="/" component={All} />
        <Redirect to="/" />
    </Switch>

</div>)

}
export default MainComponent;