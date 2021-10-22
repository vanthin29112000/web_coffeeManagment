import React, { useState, useEffect } from "react";
import { AddDataBase } from "../../Service/AddDatabase";
import cloudFireStore from "../../Service/CloudFireStore";
import "./Activate.css";
import ListActivate from "./ListActivate";
const Activate = () => {
   const [listActivate, setListActivate] = useState([]);
   const [listActivateShow, setListActivateShow] = useState([]);
   const [isShowListActiveMore, setIsShowListActiveMore] = useState(false);

   useEffect(() => {
      onGetAllActive();
   }, []);

   useEffect(() => {
      onFilterListActivateWithCount(6);
   }, [listActivate]);

   const onGetAllActive = () => {
      //get all activate in FireBase
      const temp = [];
      cloudFireStore.getAllData("ListActivate").then((doc) => {
         doc.forEach((element) => {
            temp.push(element.data());
         });
         setListActivate(temp);
      });
   };

   const onFilterListActivateWithCount = (count) => {
      // fillter with count item Activate

      let tempList = [];
      if (listActivate.length === 0) {
         return;
      }

      let i = 0;
      if (count === 0) {
         tempList = [...listActivate];
      } else {
         for (i; i < listActivate.length; i++) {
            if (i < count) {
               tempList.push(listActivate[i]);
            } else {
               break;
            }
         }
      }
      console.log(i);

      if (i >= count && i !== 0) {
         setIsShowListActiveMore(true);
      } else {
         setIsShowListActiveMore(false);
      }
      setListActivateShow(tempList);
   };

   return (
      <div className="activate-container" id="Activatepage">
         <div className="grid wide activate">
            <div className="row">
               <div className="col l-12">
                  <p className="activate__title">
                     <i class="far fa-newspaper"></i>Hoạt động & Tin tức
                  </p>
               </div>
            </div>
         </div>
         <div className="list-activate__container grid wide">
            <div className="row list-activate">
               {listActivateShow.length > 0
                  ? listActivateShow.map((activate, index) => (
                       <ListActivate
                          Activate={activate}
                          key={index}
                       ></ListActivate>
                    ))
                  : null}
            </div>
            <div className="row ">
               <div className="col l-12 c-12 m-12 show-more-item">
                  {isShowListActiveMore ? (
                     <button
                        className="btn btn-showmore"
                        onClick={() => onFilterListActivateWithCount(0)}
                     >
                        Xem tất cả <i class="fas fa-arrow-right"></i>
                     </button>
                  ) : null}
               </div>
            </div>
         </div>
      </div>
   );
};
export default Activate;
