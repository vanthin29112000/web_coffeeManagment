import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import convert from "../../Service/Convert";
import "./InfomationAccount.css";
const InfomationAccount = ({ user_info, onUpdateProfileUser }) => {
   const history = new useHistory();
   const [infoCustomer, setInfoCustomer] = useState({
      name: "",
      birthDay: "",
      gender: "",
      email: "",
      phoneNumber: "",
      address: "",
   });
   const [isShowWarning, setIsShowWarning] = useState({
      name: false,
      birthDay: false,
      gender: false,
      email: false,
      phoneNumber: false,
      address: false,
   });

   useEffect(() => {
      if (Object.keys(user_info).length !== 0) {
         setInfoCustomer({
            name: user_info.name,
            birthDay: user_info.birthDay,
            gender: user_info.gender,
            email: user_info.email,
            phoneNumber: user_info.phoneNumber,
            address: user_info.address,
         });
      }
   }, [user_info]);

   const onChangeValueInput = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      const temp = { ...infoCustomer };

      switch (name) {
         case "name": {
            setInfoCustomer({ ...temp, name: value });
            break;
         }
         case "birthDay": {
            setInfoCustomer({ ...temp, birthDay: value });
            break;
         }
         case "gender": {
            setInfoCustomer({ ...temp, gender: value });
            break;
         }
         case "email": {
            setInfoCustomer({ ...temp, email: value });
            break;
         }
         case "phoneNumber": {
            setInfoCustomer({ ...temp, phoneNumber: value });
            break;
         }
         case "address": {
            setInfoCustomer({ ...temp, address: value });
            break;
         }
         default: {
            break;
         }
      }
   };

   const onSaveChange = (e) => {
      e.preventDefault();
      const temp = { ...isShowWarning };
      let flag = true;
      for (let i of Object.keys(infoCustomer)) {
         if (infoCustomer[i] === "") {
            temp[i] = true;
            flag = false;
         } else {
            temp[i] = false;
         }
         console.log(infoCustomer[i], temp[i]);
      }

      if (flag === true) {
         onUpdateProfileUser(infoCustomer);
         history.push("/");
      }
      setIsShowWarning(temp);
   };

   return (
      <div className="infomation-account-container">
         <div className="infomation-account showSlide">
            <i
               className="far fa-times-circle btn-close"
               onClick={() => {
                  history.goBack();
               }}
            ></i>
            <h2 className="infomation-account__title">Thông tin tài khoản</h2>
            <form className="infomation-account__list">
               <div className="infomation-account__item">
                  <p>Tên của bạn</p>
                  <input
                     type="text"
                     className="input"
                     name="name"
                     onChange={onChangeValueInput}
                     value={infoCustomer.name}
                  ></input>
                  {isShowWarning.name ? (
                     <div className="notify">
                        <p>Nhập tên của bạn</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__item item-haft-left">
                  <p>Ngày sinh nhật</p>
                  <input
                     type="date"
                     className="input"
                     name="birthDay"
                     onChange={onChangeValueInput}
                     value={infoCustomer.birthDay}
                  ></input>
                  {isShowWarning.birthDay ? (
                     <div className="notify">
                        <p>Chọn ngày sinh</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__item item-haft-right ">
                  <p>Giới tính</p>
                  <select
                     name="gender"
                     id="gender"
                     className="input"
                     onChange={onChangeValueInput}
                     value={infoCustomer.gender}
                  >
                     <option value="">--Chọn giới tính--</option>
                     <option value="male">Nam</option>
                     <option value="female">Nữ</option>
                  </select>
                  {isShowWarning.gender ? (
                     <div className="notify">
                        <p>Chọn giới tính</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__item">
                  <p>Email</p>
                  <div className="infomation-account__item-in">
                     <input
                        type="email"
                        className="input"
                        name="email"
                        onChange={onChangeValueInput}
                        value={infoCustomer.email}
                        readOnly
                     ></input>
                     <i className="far fa-envelope"></i>
                  </div>
                  {isShowWarning.email ? (
                     <div className="notify">
                        <p>Vui lòng nhập email</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__item">
                  <p>Số điện thoại</p>
                  <div className="infomation-account__item-in">
                     <input
                        type="text"
                        className="input"
                        name="phoneNumber"
                        onChange={onChangeValueInput}
                        value={infoCustomer.phoneNumber}
                     ></input>
                     <i className="fas fa-phone"></i>
                  </div>
                  {isShowWarning.phoneNumber ? (
                     <div className="notify">
                        <p>Vui lòng nhập số điện thoại</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__item">
                  <p>Địa chỉ</p>
                  <div className="infomation-account__item-in">
                     <input
                        type="text"
                        className="input"
                        name="address"
                        onChange={onChangeValueInput}
                        value={infoCustomer.address}
                     ></input>
                     <i className="fas fa-map-marker-alt"></i>
                  </div>{" "}
                  {isShowWarning.address ? (
                     <div className="notify">
                        <p>Vui lòng nhập địa chỉ</p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__button">
                  <Link to="/update-password">
                     <button className="btn btn-resetpass">Đổi mật khẩu</button>
                  </Link>

                  <button className="btn btn-save" onClick={onSaveChange}>
                     Lưu thay đổi
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default InfomationAccount;
