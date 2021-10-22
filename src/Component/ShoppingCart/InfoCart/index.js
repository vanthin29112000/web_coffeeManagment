import React, { useState } from "react";
import "./InfoCart.css";
const InfoCart = () => {
   const [phoneNumber, setPhoneNumber] = useState("");
   const [nameCustomer, setNameCustomer] = useState("");
   const [address, setAddress] = useState("");

   const onCheckedPhoneNumber = (e) => {
      e.preventDefault();

      let { value } = e.target;

      if (value === "") {
         setPhoneNumber("");
         return;
      }

      const phoneNumber = Number(value);
      console.log(phoneNumber);

      if (!isNaN(phoneNumber) && value.length <= 10) {
         setPhoneNumber(value);
      }
   };

   return (
      <div className="info-cart">
         <div className="info-customer-incart">
            <div className="customer name-customer">
               <p className="title">Tên khách hàng</p>
               <input
                  type="text"
                  className="input input-customer"
                  placeholder="Nhập tên người nhận"
                  onChange={(e) => {
                     e.preventDefault();
                     setNameCustomer(e.target.value);
                  }}
                  value={nameCustomer}
                  // disabled
               ></input>
               <div className="notify ">
                  <p>Vui lòng nhập tên người nhận</p>
               </div>
            </div>

            <div className="customer address-customer">
               <p className="title">Địa chỉ giao hàng</p>
               <input
                  type="text"
                  className="input input-customer"
                  placeholder="Nhập địa chỉ giao hàng"
                  onChange={(e) => {
                     e.preventDefault();
                     setAddress(e.target.value);
                  }}
                  value={address}
               ></input>
               <div className="notify">
                  <p>Vui lòng nhập địa chỉ giao hàng</p>
               </div>
            </div>

            <div className="customer phone-customer">
               <p className="title">Số điện thoại</p>
               <input
                  type="text"
                  className="input input-customer"
                  placeholder="Nhập số điện thoại"
                  onChange={onCheckedPhoneNumber}
                  value={phoneNumber}
               ></input>
               <div className="notify">
                  <p>Vui lòng nhập số điện thoại</p>
               </div>
            </div>
         </div>

         <div className="total-price">
            <div className="price__product-shipping">
               <div className="total-price__item">
                  <p>Thành tiền</p>
                  <p>12.000.000 đ</p>
               </div>
               <div className="total-price__item">
                  <p>Tiền Ship</p>
                  <p>12.000 đ</p>
               </div>
            </div>
         </div>
         <div className="total-price__sum">
            <p>Tổng tiền</p>
            <p>12.012.000 đ</p>
         </div>
      </div>
   );
};
export default InfoCart;
