import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthFireBase from "../../Service/Auth";

import "./NavBar.css";
export const NavBar = ({ user, onSignOut, onShowAlertNotify }) => {
   const history = useHistory();

   const checkedUser = (e) => {
      e.preventDefault();
      if (user !== "") {
         history.push(`/ShoppingCart`);
      } else {
         onShowAlertNotify(
            "Vui lòng đăng nhập trước khi thực hiện thao tác này !",
            "3"
         );
      }
   };

   return (
      <header className="navbar-container">
         <div className="grid wide navbar_pc">
            <div className="row no-gutter navbar">
               <div className="col l-4 m-10 c-8">
                  <div className="logo">
                     <img src="\logo512.png" alt=".img"></img>
                     <h1 className="logo_name">Eko Coffee</h1>
                  </div>
               </div>
               {/* <div className="col l-2 m-8 c-6 "></div> */}
               <div className="col l-6 m-0 c-0 listpage_container">
                  <div className="listpage">
                     <div className="page_name">
                        <a href="#">Trang chủ</a>
                     </div>
                     <div className="page_name">
                        <a href="#Orderpage">Đặt hàng</a>
                     </div>
                     <div className="page_name">
                        <a href="#Activatepage">Hoạt động</a>
                     </div>
                     <div className="page_name">
                        <a href="#Contactpage">Hợp tác</a>
                     </div>
                  </div>
               </div>
               <div className="col l-2 m-2 c-4">
                  <div className="login_shopping">
                     <div className="shopping_icon" onClick={checkedUser}>
                        <i className="fas fa-shopping-cart"></i>
                        <div className="amount-sp"></div>
                     </div>
                     {user === "" ? (
                        <div className="auth-customer">
                           <i className="far fa-user-circle icon-circle"></i>
                           <div className="auth-customer-selection">
                              <Link
                                 to={`/Auth-customer`}
                                 className="auth-customer-selection_item"
                              >
                                 <i class="fas fa-sign-out-alt"></i>
                                 <p>Đăng nhập</p>
                              </Link>
                           </div>
                        </div>
                     ) : (
                        <div className="auth-customer">
                           <i className="far fa-user-circle icon-circle"></i>
                           <div className="auth-customer-selection">
                              <div className="auth-customer-selection_item">
                                 <i class="far fa-user-circle"></i>
                                 <Link to="/info-account">
                                    <p>Tài khoản</p>
                                 </Link>
                              </div>
                              <div className="auth-customer-selection_item">
                                 <i class="fas fa-clipboard-list"></i>{" "}
                                 <Link to="/order-history">
                                    <p>Lịch sử đặt hàng</p>
                                 </Link>
                              </div>
                              <div
                                 className="auth-customer-selection_item"
                                 onClick={onSignOut}
                              >
                                 <i class="fas fa-sign-out-alt"></i>
                                 <p>Đăng xuất</p>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Mobile-Tablet */}
               <div className="nav-mobile">
                  <a href="#" className="page_name_mobile">
                     <i className="fas fa-home"></i>
                     <p>Trang chủ</p>
                  </a>
                  <a href="#Orderpage" className="page_name_mobile">
                     <i className="fas fa-coffee"></i>
                     <p>Đặt hàng</p>
                  </a>
                  <a href="#Activatepage" className="page_name_mobile">
                     <i className="far fa-newspaper"></i>
                     <p>Hoạt động</p>
                  </a>
                  <a href="#Contactpage" className="page_name_mobile">
                     <i className="far fa-handshake"></i>
                     <p>Hợp tác</p>
                  </a>
               </div>
            </div>
         </div>
      </header>
   );
};
