import React from "react";
import "./ListActivate.css";
const ListActivate = ({ Activate }) => {
   return (
      <div className="col l-4 c-12 m-6 activate__item">
         <div className="activate__item-container">
            <img src={Activate.img} alt="img.png"></img>
            <div className="activate__item-info">
               <p className="activate__item-title">{Activate.title}</p>
               <p className="activate__item-infomation">{Activate.info}</p>
               <p className="info-time">Thời gian : {Activate.timeline}</p>
               <div className="more-info">
                  <a href="https://www.facebook.com/connectingart2020/photos/a.103327217939306/290520199220006/">
                     Xem chi tiết
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};
export default ListActivate;
