import React from "react";
import InfoCart from "./InfoCart";
import ProductInCart from "./ProductInCart";
import { useHistory } from "react-router";
import "./ShoppingCart.css";
const ShoppingCart = ({
   user,
   infoUser,
   listProductIncart,
   listProduct,
   updateListProductIncart,
   onShowAlertNotify,
}) => {
   const history = new useHistory();

   const onGoBack = (e) => {
      e.preventDefault();
      history.goBack();
   };

   const onChangeAmountProduct = (idProduct, amount) => {
      const findIndex = listProductIncart.findIndex(
         (ele) => ele.id_incart === idProduct
      );
      listProductIncart[findIndex].amount = amount;
      updateListProductIncart(
         listProductIncart,
         "Thay đổi giỏ hàng thành công",
         false
      );
   };

   const onRemoveProductIncart = (idProduct) => {
      const listProductfilter = listProductIncart.filter(
         (ele) => ele.id_incart !== idProduct
      );

      console.log("list remove", listProductfilter);
      listProductIncart = [...listProductfilter];

      updateListProductIncart(
         listProductIncart,
         "Thay đổi giỏ hàng thành công",
         false
      );
   };

   return (
      <>
         <div className="shopping-cart">
            <div className="shopping-cart__container">
               <div className="shopping-cart__left">
                  <div className="shopping-cart__left-title">
                     <div className="title-item">
                        <div className="title-item-pc">
                           <h3>Giỏ Hàng</h3>
                        </div>
                        <div className="title-item-mobile">
                           <i
                              className="fas fas fa-chevron-left"
                              onClick={onGoBack}
                           ></i>
                           <h3>Giỏ Hàng</h3>
                        </div>
                        <p>
                           Số lượng sản phẩm :{" "}
                           {listProductIncart ? listProductIncart.length : 0}
                        </p>
                     </div>
                  </div>
                  <div className="list-product-incart">
                     <div className="list-product-incart-item">
                        {listProductIncart
                           ? listProductIncart.map((ele, index) => {
                                const findIndex = listProduct.findIndex(
                                   (item) => item.id === ele.info.id_product
                                );
                                if (findIndex !== -1) {
                                   const product = listProduct[findIndex].info;
                                   const idProduct = listProduct[findIndex].id;
                                   return (
                                      <ProductInCart
                                         idProduct={ele.id_incart}
                                         product={product}
                                         productIncart={ele}
                                         amountItem={ele.amount}
                                         onChangeAmountProduct={
                                            onChangeAmountProduct
                                         }
                                         onRemoveProductIncart={
                                            onRemoveProductIncart
                                         }
                                         key={index}
                                      ></ProductInCart>
                                   );
                                }
                             })
                           : null}
                     </div>
                  </div>

                  <button className="btn btn-back-pc" onClick={onGoBack}>
                     <i className="fas fa-arrow-right"></i>
                     Quay trở lại
                  </button>
               </div>
               <div className="shopping-cart__right">
                  <p className="shopping-cart__right-title">
                     Thông tin hóa đơn
                  </p>
                  <InfoCart
                     userId={user}
                     infoUser={infoUser}
                     listProductIncart={listProductIncart}
                     listProduct={listProduct}
                     updateListProductIncart={updateListProductIncart}
                     onShowAlertNotify={onShowAlertNotify}
                  ></InfoCart>
               </div>
            </div>
         </div>
      </>
   );
};
export default ShoppingCart;
