import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import cloudFireStore from "../../../Service/CloudFireStore";
import convert from "../../../Service/Convert";
import "./InfoCart.css";

const InfoCart = ({
   userId,
   infoUser,
   listProductIncart,
   listProduct,
   updateListProductIncart,
   onShowAlertNotify,
}) => {
   const history = new useHistory();

   const [phoneNumber, setPhoneNumber] = useState("");
   const [nameCustomer, setNameCustomer] = useState("");
   const [address, setAddress] = useState("");
   const [sum, setSum] = useState(0);
   const [isShowWarningPhone, setIsShowWarningPhone] = useState(false);
   const [isShowWarningCustomer, setIsShowWarningCustomer] = useState(false);
   const [isShowWarningAdress, setIsShowWarningAdress] = useState(false);

   useEffect(() => {
      onSumPrice();
   });

   useEffect(() => {
      setPhoneNumber(infoUser.phoneNumber);
      setNameCustomer(infoUser.name);
      setAddress(infoUser.address);
   }, []);

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

   const onCheckOut = (e) => {
      e.preventDefault();
      let flag = true;
      //set notidy Warning
      if (phoneNumber === "") {
         setIsShowWarningPhone(true);
         flag = false;
      } else {
         setIsShowWarningPhone(false);
      }
      if (nameCustomer === "") {
         setIsShowWarningCustomer(true);
         flag = false;
      } else {
         setIsShowWarningCustomer(false);
      }
      if (address === "") {
         setIsShowWarningAdress(true);
         flag = false;
      } else {
         setIsShowWarningAdress(false);
      }
      if (listProductIncart.length === 0) {
         flag = false;
         onShowAlertNotify(
            "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán !",
            "3"
         );
      }
      if (flag === true) {
         const infoBill = {
            userId: userId,
            name: nameCustomer,
            address: address,
            phoneNumber: phoneNumber,
            listProduct: listProductIncart,
            status: "Đang xử lý",
            type: true, //thanh toan hay chua
            date_submitted: new Date(),
            shipCode: 12000,
         };

         cloudFireStore
            .addData(infoBill, "ListBill")
            .then((id) => {
               history.goBack();
               updateListProductIncart([], "Thanh toán thành công!!", true);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

   const onSumPrice = () => {
      let sum = 0;
      if (listProductIncart) {
         listProductIncart.forEach((ele) => {
            const findIndex = listProduct.findIndex(
               (item) => item.id === ele.info.id_product
            );
            sum += ele.total_price * ele.amount;
         });
         setSum(sum);
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
               {isShowWarningCustomer ? (
                  <div className="notify ">
                     <p>Vui lòng nhập tên người nhận</p>
                  </div>
               ) : (
                  <></>
               )}
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
               {isShowWarningAdress ? (
                  <div className="notify">
                     <p>Vui lòng nhập địa chỉ giao hàng</p>
                  </div>
               ) : (
                  <></>
               )}
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
               {isShowWarningPhone ? (
                  <div className="notify">
                     <p>Vui lòng nhập số điện thoại</p>
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>

         <div className="total-price">
            <div className="price__product-shipping">
               <div className="total-price__item">
                  <p>Thành tiền</p>
                  <p>{convert.onChangeCurrency(sum)} đ</p>
               </div>
               <div className="total-price__item">
                  <p>Tiền Ship</p>
                  <p>12.000 đ</p>
               </div>
            </div>
         </div>
         <div className="total-price__sum">
            <p>Tổng tiền</p>
            <p>{convert.onChangeCurrency(sum + 12000)} đ</p>
         </div>
         <button className="btn btn-check-out" onClick={onCheckOut}>
            THANH TOÁN
         </button>
      </div>
   );
};
export default InfoCart;
