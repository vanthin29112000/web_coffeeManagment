import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";

const AuthCustomerBg = () => {
   const { url } = useRouteMatch();
   const [isShowAuthContainer, setisShowAuthContainer] = useState(true);
   const history = useHistory();
   return (
      <div
         className={`login-customer  ${
            isShowAuthContainer ? "showSlide" : "hidenSlide"
         }`}
      >
         <div className="login-customer__logo">
            <img src="\logo512.png" alt="img.png"></img>
         </div>
         <div className="login-customer__title">
            <h1>Xin chào !!!</h1>
            <p>Chào mừng bạn đến với Eko Coffee</p>
         </div>

         <div className="signin-login">
            <Link to={`${url}/Login`}>
               <button className="Login-customer btn">Đăng Nhập</button>
            </Link>
            <Link to={`${url}/Signin`}>
               <button className="signin-customer btn">Đăng Kí</button>
            </Link>
         </div>
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
   );
};
export default AuthCustomerBg;
