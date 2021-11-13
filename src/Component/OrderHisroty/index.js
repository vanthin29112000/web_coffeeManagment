import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { useHistory } from "react-router";
import OrderHistoryItem from "./OrderHistoryItem";
import cloudFireStore from "../../Service/CloudFireStore";
const OrderHistory = ({ userID }) => {
   const history = new useHistory();
   const [orderHistory, setOrderHistory] = useState([]);
   const [keyFilter, setKeyFilter] = useState("");
   const [orderHistoryShow, setOrderHistoryShow] = useState([]);
   useEffect(() => {
      let temp = orderHistory.filter((order) => order.id.includes(keyFilter));
      setOrderHistoryShow(temp);
   }, [keyFilter]);

   useEffect(() => {
      let temp_list_order = [];
      cloudFireStore
         .getDataWithCondition("ListBill", "userId", userID)
         .then((listBill) => {
            listBill.forEach((bill) => {
               let order_temp = {
                  id: bill.id,
                  ...bill.data(),
               };
               temp_list_order.push(order_temp);
            });
            temp_list_order = temp_list_order.sort(
               (a, b) => b.date_submitted - a.date_submitted
            );
            setOrderHistory(temp_list_order);
            setOrderHistoryShow(temp_list_order);
         })
         .catch((error) => {
            console.log("error", error);
         });
   }, [userID]);

   const onChangeKeyFilter = (e) => {
      e.preventDefault();
      const { value, name } = e.target;

      setKeyFilter(value);
   };

   return (
      <div className="order-history-container">
         <div className="order-history-bg showSlide">
            <h2 className="order-history__title">Lịch sử đặt hàng </h2>
            <i
               className="far fa-times-circle btn-close"
               onClick={() => {
                  history.goBack();
               }}
            ></i>
            <div className="order-history__filter">
               <div className="order-history__filter-finding">
                  <div className="input-finding">
                     <label for="finding_id_incart">Mã đơn hàng</label>
                     <input
                        id="finding_id_incart"
                        className="input"
                        placeholder="Nhập mã đơn hàng bạn muốn tìm"
                        onChange={onChangeKeyFilter}
                        value={keyFilter}
                     ></input>
                  </div>
                  <button className="btn btn-finding">Tìm kiếm</button>
               </div>
               <div className="list-order-history">
                  {orderHistoryShow.length !== 0
                     ? orderHistoryShow.map((order, index) => (
                          <OrderHistoryItem
                             orderInfo={order}
                             key={index}
                          ></OrderHistoryItem>
                       ))
                     : null}
               </div>
            </div>
         </div>
      </div>
   );
};
export default OrderHistory;
