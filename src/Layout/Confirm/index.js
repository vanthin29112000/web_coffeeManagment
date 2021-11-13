import React from "react";
import "./Confirm.css";
export const Confirm = ({ mess, isShow, onAccept, onBack }) => {
   return (
      <>
         {isShow ? (
            <div className="confirm-container">
               <div className="confirm-container-bg showSlide">
                  <i
                     className="far fa-times-circle btn-close"
                     onClick={onBack}
                  ></i>
                  <p className="confirm-container__mess">{mess}</p>
                  <div className="list-btn">
                     <button className="btn btn-nonaccept" onClick={onBack}>
                        Quay lại
                     </button>
                     <button className="btn btn-accept" onClick={onAccept}>
                        Đồng ý
                     </button>
                  </div>
               </div>
            </div>
         ) : null}
      </>
   );
};
