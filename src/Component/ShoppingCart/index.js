import React from "react";
import InfoCart from "./InfoCart";
import ProductInCart from "./ProductInCart";
import { useHistory } from "react-router";

import "./ShoppingCart.css";
const ShoppingCart = () => {
   const history = new useHistory();

   const onGoBack = (e) => {
      e.preventDefault();
      history.goBack();
   };

   return (
      <div className="shopping-cart">
         <div className="shopping-cart__container">
            <div className="shopping-cart__left">
               <div className="shopping-cart__left-title">
                  <div className="title-item">
                     <h3>Giỏ Hàng</h3>
                     <p>Số lượng sản phẩm : 3</p>
                  </div>
               </div>
               <div className="list-product-incart">
                  <ProductInCart></ProductInCart>
               </div>

               <button className="btn btn-back" onClick={onGoBack}>
                  <i class="fas fa-arrow-right"></i>Quay trở lại
               </button>
            </div>
            <div className="shopping-cart__right">
               <p className="shopping-cart__right-title">Thông tin hóa đơn</p>
               <InfoCart></InfoCart>
               <button className="btn btn-check-out">THANH TOÁN</button>
            </div>
         </div>
      </div>
   );
};
export default ShoppingCart;
