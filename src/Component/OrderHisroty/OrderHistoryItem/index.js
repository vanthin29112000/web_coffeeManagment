import React, { useState, useEffect } from "react";
import OrderHistoryProduct from "../OrderHistoryProduct";
import convert from "../../../Service/Convert";
export const OrderHistoryItem = ({ orderInfo }) => {
   const [isShowMore, setIsShowMore] = useState(false);
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      let sum = 0;
      if (orderInfo.listProduct.length !== 0) {
         orderInfo.listProduct.forEach((ele) => {
            sum += ele.amount * ele.total_price;
         });

         setTotalPrice(sum);
      }
   }, [orderInfo]);
   return (
      <div className="list-order-history__item">
         <div className="list-order-history__item-title">
            <p className="history-item__title">
               #{orderInfo.id}{" "}
               <p className="type-order wait">( {orderInfo.status} ...)</p>
            </p>
            <p className="history-item__price">
               {" "}
               {convert.onChangeCurrency(totalPrice)} đ
            </p>
         </div>
         <div className="history-item__list-product">
            {orderInfo.listProduct.length !== 0 ? (
               isShowMore ? (
                  orderInfo.listProduct.map((product) => (
                     <OrderHistoryProduct
                        product={product}
                     ></OrderHistoryProduct>
                  ))
               ) : orderInfo.listProduct.length > 1 ? (
                  <>
                     <OrderHistoryProduct
                        product={orderInfo.listProduct[0]}
                     ></OrderHistoryProduct>
                     <div className="btn-more">
                        <button
                           className="btn"
                           onClick={(e) => {
                              e.preventDefault();
                              setIsShowMore(true);
                           }}
                        >
                           <i class="fas fa-chevron-right"></i> Xem thêm (
                           {orderInfo.listProduct.length - 1} sản phẩm)
                        </button>
                     </div>
                  </>
               ) : (
                  orderInfo.listProduct.map((product) => (
                     <OrderHistoryProduct
                        product={product}
                     ></OrderHistoryProduct>
                  ))
               )
            ) : null}
         </div>
         <div className="order-history-customer">
            <p>Địa chỉ giao hàng : {orderInfo.address}</p>
            <p>
               Thời gian đặt :{" "}
               {convert.onChangeToTime(orderInfo.date_submitted.seconds)}
            </p>
         </div>
      </div>
   );
};
export default OrderHistoryItem;
