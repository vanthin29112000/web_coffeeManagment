import React from "react";
import { Route, Switch } from "react-router";
import Activate from "../../Component/Activate";
import Contact from "../../Component/Contact";
import ListProducts from "../../Component/ListProducts";
import ShoppingCart from "../../Component/ShoppingCart";
import SlideShowBanner from "../../Component/SlideShowBanner";
import "./HomePage.css";

const HomePage = () => {
   return (
      <div className="homepage">
         <div className="homepage__carousel">
            <SlideShowBanner></SlideShowBanner>
            <Switch>
               <Route path="/ShoppingCart" component={ShoppingCart}></Route>
            </Switch>
         </div>
         <ListProducts></ListProducts>
         <Activate></Activate>
         <Contact></Contact>
      </div>
   );
};
export default HomePage;
