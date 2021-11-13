import React from "react";
import "./Loading.css";
const Loading = ({ isShow }) => {
   return (
      <>
         {isShow ? (
            <div className="loading-container">
               <img src="\Loading\Loading.gif"></img>
            </div>
         ) : null}
      </>
   );
};
export default Loading;
