import React, { useEffect, useState } from "react";
import Carousel from "../../Layout/Carousel";
import cloudFireStore from "../../Service/CloudFireStore";
import "./SlideShowBanner.css";
const SlideShowBanner = () => {
   const [listURL, setListURL] = useState([]);

   useEffect(() => {
      const list = [];
      cloudFireStore.getAllData("listBanner").then((data) => {
         data.forEach((item) => {
            list.push(item.data().url);
         });
         setListURL(list);
      });
   }, []);
   return (
      <div className="grid wide carousel_bg">
         <div className="row no-gutters carousel_container">
            <div className="col l-o-12 m-o-12 c-12">
               {listURL.length > 0 ? (
                  <Carousel countSlide={listURL.length} isShowDot={true}>
                     <>
                        {listURL.map((ele, index) => {
                           return (
                              <img
                                 src={ele}
                                 className="banner_img"
                                 key={index}
                                 alt="label.png"
                              ></img>
                           );
                        })}
                     </>
                  </Carousel>
               ) : null}
            </div>
         </div>
      </div>
   );
};
export default SlideShowBanner;
