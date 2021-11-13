import React, { useState, useEffect } from "react";
import "./Notify.css";

const Notify = ({ type, message, isShow, setNotify }) => {
   //1 : success - 2 : warning - 3 : error

   return (
      <div className="notify-container">
         <div
            className={`notify-alert ${
               type === "1"
                  ? "succesful"
                  : type === "2"
                  ? "warning"
                  : type === "3"
                  ? "error"
                  : null
            }-alert ${isShow ? "show" : "hide"}`}
         >
            <div className="message">
               <i className="fas fa-exclamation-circle"></i>
               <p>{`${
                  type === "1"
                     ? "Thông báo"
                     : type === "2"
                     ? "Cảnh báo"
                     : type === "3"
                     ? "Lỗi"
                     : null
               } : ${message}`}</p>
            </div>
            <div className="close-notify">
               <i className="fas fa-times " onClick={setNotify}></i>
            </div>
         </div>
      </div>
   );
};
export default Notify;
