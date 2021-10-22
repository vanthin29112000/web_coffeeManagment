import React from "react";
import "./ProductItem.css";
const ProductItem = ({ infoProduct }) => {
   const onChangeCurrency = (number) => {
      return new Intl.NumberFormat().format(number);
   };

   return (
      <div className="col l-2 m-4 c-12">
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
                        <p>{onChangeCurrency(infoProduct.price)} đ</p>
                        <button className="btn">
                           <i className="fas fa-plus-circle"></i>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default ProductItem;
