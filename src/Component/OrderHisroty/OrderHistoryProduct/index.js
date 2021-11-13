import React, { useState, useEffect } from "react";
import cloudFireStore from "../../../Service/CloudFireStore";
import convert from "../../../Service/Convert";
const OrderHistoryProduct = ({ product }) => {
   const [productInfo, setProductInfo] = useState({});

   useEffect(() => {
      cloudFireStore
         .getDataId("ListProduct", product.info.id_product)
         .then((productItem) => {
            setProductInfo(productItem);
         });
   }, [product]);

   return (
      <div className="history-item__list-product-item">
         <img src={productInfo.img}></img>
         <div className="history-item__list-product-info">
            <h4 className="product-name-history">
               {productInfo.name}{" "}
               <p>
                  x{product.amount} :{" "}
                  {convert.onChangeCurrency(
                     product.total_price * product.amount
                  )}{" "}
                  đ
               </p>
            </h4>
            <div className="size-topping-history">
               <p>Size : {product.info.size.title} </p>
               {product.info.topping.length !== 0 ? (
                  <p>
                     , Topping :{" "}
                     {product.info.topping.map((topping) => {
                        return `+${topping.amount} ${topping.info.name}`;
                     })}
                  </p>
               ) : null}
            </div>
            {product.info.note !== "" ? (
               <p className="note-product-history">
                  Ghi chú : {product.info.note}
               </p>
            ) : null}
         </div>
      </div>
   );
};
export default OrderHistoryProduct;
