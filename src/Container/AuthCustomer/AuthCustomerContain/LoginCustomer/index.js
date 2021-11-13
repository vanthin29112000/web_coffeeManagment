import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Notify from "../../../../Component/Notify";
import onShowAlert from "../../../../Component/Notify/CheckShowNotify";
import AuthFireBase from "../../../../Service/Auth";
import "./LoginCustomer.css";

export const LoginCustomer = ({ setIsShowAlert }) => {
   const [isShowPass, setIsShowPass] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [notify, setNotify] = useState({
      isShow: "",
      type: "",
      mess: "",
   });
   const history = new useHistory();

   const onChangeValue = (e) => {
      e.preventDefault();
      const { value, name } = e.target;
      switch (name) {
         case "email":
            setEmail(value);
            break;
         case "pass":
            setPassword(value);
            break;
         default:
            break;
      }
   };

   const onChangeShowPass = () => {
      const flag = isShowPass;
      setIsShowPass(!flag);
   };

   const onLogin = (e) => {
      e.preventDefault();
      AuthFireBase.Login(email, password)
         .then(() => {
            history.push("/");
            setIsShowAlert("Đăng nhập thành công", "1");
         })
         .catch((error) => {
            onShowAlert("Sai tài khoản hoặc mật khẩu", "3", setNotify);
         });
   };

   return (
      <>
         {notify.isShow !== "" ? (
            <Notify
               type={notify.type}
               message={notify.mess}
               isShow={notify.isShow}
               setNotify={() => {
                  setNotify({
                     ...notify,
                     isShow: false,
                  });
               }}
            ></Notify>
         ) : null}
         <div className="login-customer showSlide">
            <div className="login-customer__title ">
               <div className="login-customer__title-text">
                  <p>Chào mừng bạn quay trở lại,</p>
                  <h1>Đăng nhập !</h1>
               </div>
               <div className="login-customer__title-bg"></div>
            </div>
            <form
               className="login-customer__input-container"
               onSubmit={onLogin}
            >
               <div className="login-customer__input">
                  <p className="login-customer__input-title">Email</p>
                  <div className="">
                     <input
                        type="Email"
                        className="input"
                        placeholder="Email"
                        name="email"
                        onChange={onChangeValue}
                     ></input>
                  </div>
               </div>
               <div className="login-customer__input">
                  <p className="login-customer__input-title">Mật khẩu</p>
                  {isShowPass ? (
                     <div className="password">
                        <input
                           type="text"
                           className="input"
                           placeholder="Mật khẩu"
                           name="pass"
                           onChange={onChangeValue}
                        ></input>
                        <i
                           className="far fa-eye"
                           onClick={() => onChangeShowPass()}
                        ></i>
                     </div>
                  ) : (
                     <div className="password">
                        <input
                           type="password"
                           className="input"
                           placeholder="Mật khẩu"
                           name="pass"
                           onChange={onChangeValue}
                        ></input>

                        <i
                           className="far fa-eye-slash"
                           onClick={() => onChangeShowPass()}
                        ></i>
                     </div>
                  )}
               </div>
               <div
                  className="forgot-pass"
                  onClick={() => {
                     history.push("/Auth-customer/reset-pass");
                  }}
               >
                  <p>Quên mật khẩu ?</p>
               </div>
               <div className="signin-login">
                  <button className="Login-customer btn" type="submit">
                     Đăng Nhập
                  </button>
               </div>
            </form>
            <div className="btn-turn-back">
               <button
                  className=" btn"
                  onClick={() => {
                     history.goBack();
                  }}
               >
                  <i className="fas fa-arrow-right "></i>
                  <p>Quay lại</p>
               </button>
            </div>
         </div>
      </>
   );
};
export default LoginCustomer;
