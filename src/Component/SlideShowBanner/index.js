import React, { useEffect, useState } from "react";
// import Carousel from "../../Layout/Carousel";
import cloudFireStore from "../../Service/CloudFireStore";
import "./SlideShowBanner.css";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightOutlined } from "@ant-design/icons";

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
               <Carousel autoplay>
                  {listURL.length > 0 &&
                     listURL.map((ele, index) => (
                        <div>
                           <img
                              src={ele}
                              className="banner_img"
                              key={index}
                              alt="label.png"
                           ></img>
                        </div>
                     ))}
               </Carousel>
            </div>
         </div>
      </div>
   );
};
export default React.memo(SlideShowBanner);
