import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export const NavBar = () => {
   return (
      <div className="navbar-container">
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
                     <Link to="/ShoppingCart" className="shopping_icon">
                        <i className="fas fa-shopping-cart"></i>
                        <div className="amount-sp"></div>
                     </Link>
                     <i className="far fa-user-circle icon-circle"></i>
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
      </div>
   );
};
