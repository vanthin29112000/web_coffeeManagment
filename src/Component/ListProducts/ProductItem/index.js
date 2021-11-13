import React from "react";
import { Link } from "react-router-dom";
import convert from "../../../Service/Convert";
import "./ProductItem.css";
const ProductItem = ({ infoProduct, id }) => {
   return (
      <div className="col l-2 m-4 c-12">
         <Link to={`/info-product/${id}`}>
            <div className=" drink-item__container">
               <div className="drink-item">
                  <img
                     src={infoProduct.img}
                     className="drink-item__img"
                     alt=".png"
                  ></img>
                  <div className="drink-item__info">
                     <p className="drink-name">{infoProduct.name}</p>
                     <div className="price-adddrink">
                        <div className="price-adddrink__container">
                           <p>
                              {convert.onChangeCurrency(infoProduct.price)} đ
                           </p>
                           <button className="btn">
                              <i className="fas fa-plus-circle"></i>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Link>
      </div>
   );
};
export default ProductItem;
