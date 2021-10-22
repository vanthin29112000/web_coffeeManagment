import React, { useState } from "react";
import "./ProductInCart.css";
const ProductInCart = () => {
   const [amount, setAmount] = useState(1);

   const onCheckedAmount = (e) => {
      e.preventDefault();
      let { value } = e.target;
      const amountProduct = Number(value);
      console.log(amountProduct);

      if (value === "") {
         setAmount(0);
         return;
      }

      if (!isNaN(amountProduct)) {
         setAmount(amountProduct);
      }
   };

   const onCheckedBlur = (e) => {
      e.preventDefault();

      if (amount === 0) {
         setAmount(1);
      }
   };

   const onIncreaseAmountProduct = (limit) => {
      const amountProduct = amount;
      if (amountProduct < limit) {
         setAmount(amountProduct++);
      }
   };
   const onDecreaseAmountProduct = (limit) => {
      const amountProduct = amount;
      if (amountProduct > 0) {
         setAmount(amountProduct--);
      }
   };

   const onChangeCurrency = (number) => {
      return new Intl.NumberFormat().format(number);
   };

   return (
      <div className="product-item-incart">
         <img src="\Drink\caphe-suada--bacsiu_063797_400x400.jpg"></img>
         <div className="name-topping">
            <p className="name-drink">Cafe Sữa đá</p>
            <div className="topping-drink">
               <p>Size : nhỏ</p>
               <p>Topping : +1 Espresso</p>
            </div>
         </div>
         <form className="amount-drink-cart">
            <button className="btn ">+</button>
            <input
               className="input"
               type="text"
               onChange={onCheckedAmount}
               value={amount}
               onBlur={onCheckedBlur}
            />
            <button className="btn">-</button>
         </form>

         <div className="total-price-product">
            <p>1.000.000 đ</p>
         </div>
         <div className="delete-product-incart">
            <i class="fas fa-times"></i>
         </div>
      </div>
   );
};

export default ProductInCart;
