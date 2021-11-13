import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import "./AuthCustomer.css";
import AuthCustomerBg from "./AuthCustomerContain/AuthCustomerBg";
import LoginCustomer from "./AuthCustomerContain/LoginCustomer";
import { ResetPassword } from "./AuthCustomerContain/ResetPassword";
import { SigninCustomer } from "./AuthCustomerContain/SigninCustomer";
const AuthCustomer = ({ setNotify }) => {
   let { path } = useRouteMatch();
   return (
      <div className="login-customer__container">
         <Switch>
            <Route path={`${path}/`} exact>
               <AuthCustomerBg></AuthCustomerBg>
            </Route>
            <Route path={`${path}/Login`}>
               <LoginCustomer setIsShowAlert={setNotify}></LoginCustomer>
            </Route>
            <Route path={`${path}/Signin`}>
               <SigninCustomer setIsShowAlert={setNotify}></SigninCustomer>
            </Route>
            <Route path={`${path}/reset-pass`}>
               <ResetPassword></ResetPassword>
            </Route>
         </Switch>
      </div>
   );
};
export default AuthCustomer;
