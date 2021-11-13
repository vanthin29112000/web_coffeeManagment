import React, { useEffect, useState } from "react";
import { Confirm } from "../../../Layout/Confirm";
import convert from "../../../Service/Convert";
import "./ProductInCart.css";
const ProductInCart = ({
   idProduct,
   product,
   productIncart,
   amountItem,
   onChangeAmountProduct,
   onRemoveProductIncart,
}) => {
   const [amount, setAmount] = useState(0);
   const [comfirmShow, setComfirmShow] = useState({
      mess: "",
      isShow: false,
      accept: false,
   });

   useEffect(() => {
      if (comfirmShow.accept) {
         //nếu accept
         onRemoveProductIncart(idProduct);
      }
   }, [comfirmShow]);

   useEffect(() => {
      setAmount(amountItem);
   }, [amountItem]);

   useEffect(() => {
      if (amount !== amountItem && amount !== 0) {
         onChangeAmountProduct(idProduct, amount);
      }
   }, [amount]);

   const onCheckedAmount = (e) => {
      //checked is NAN
      e.preventDefault();
      let { value } = e.target;
      const amountProduct = Number(value);

      if (value === "") {
         setAmount(0);
         return;
      }

      if (!isNaN(amountProduct)) {
         setAmount(amountProduct);
      }
   };

   const onCheckedBlur = (e) => {
      //set limit = 1
      e.preventDefault();

      if (amount === 0) {
         setAmount(1);
      }
   };

   const onIncreaseAmountProduct = (e) => {
      e.preventDefault();
      let amountProduct = Number(amount);
      if (amountProduct < 99) {
         amountProduct++;
         setAmount(amountProduct);
      }
   };

   const onDecreaseAmountProduct = (e) => {
      e.preventDefault();
      let amountProduct = Number(amount);
      if (amountProduct > 1) {
         amountProduct--;
         setAmount(amountProduct);
      }
   };

   const onChangeCurrency = (number) => {
      return new Intl.NumberFormat().format(number);
   };

   const onRemoveProduct = (e) => {
      e.preventDefault();
      onShowComfirm();
   };

   const onShowComfirm = () => {
      let temp = { ...comfirmShow };
      temp.isShow = true;
      temp.mess = "Bạn có muốn xóa sản phẩm này ? ";

      setComfirmShow(temp);
   };

   return (
      <>
         <Confirm
            mess={comfirmShow.mess}
            isShow={comfirmShow.isShow}
            onAccept={() => {
               setComfirmShow({ ...comfirmShow, accept: true });
            }}
            onBack={() => {
               console.log("back");
               setComfirmShow({ ...comfirmShow, isShow: false });
            }}
         ></Confirm>
         {/* 2 site : 1 pc & 1 mobile */}
         <div className="product-item-incart">
            <img src={product.img} alt="img.png"></img>
            <div className="name-topping">
               <p className="name-drink">{product.name}</p>
               <div className="topping-drink">
                  <p>Size : {productIncart.info.size.title}</p>
                  {productIncart.info.topping.length !== 0 ? (
                     <p>
                        Topping :{" "}
                        {productIncart.info.topping.map((item, index) => {
                           if (index > 0) {
                              return `, +${item.amount} ${item.info.name}`;
                           } else {
                              return `+${item.amount} ${item.info.name}`;
                           }
                        })}
                     </p>
                  ) : null}

                  {productIncart.info.note !== "" ? (
                     <p>Ghi chú :{productIncart.info.note}</p>
                  ) : null}
               </div>
            </div>
            <form className="amount-drink-cart">
               <button
                  className="btn btn-increase"
                  type="button"
                  onClick={onIncreaseAmountProduct}
               >
                  +
               </button>
               <input
                  className="input"
                  type="text"
                  onChange={onCheckedAmount}
                  value={amount}
                  onBlur={onCheckedBlur}
               />
               <button
                  className="btn btn-decrease"
                  type="button"
                  onClick={onDecreaseAmountProduct}
               >
                  -
               </button>
            </form>

            <div className="total-price-product">
               <p>
                  {convert.onChangeCurrency(productIncart.total_price * amount)}{" "}
                  đ
               </p>
            </div>
            <div className="delete-product-incart">
               <i className="fas fa-times" onClick={onRemoveProduct}></i>
            </div>
         </div>

         {/* mobile */}
         <div className="product-item-incart incart-mobile">
            <img src={product.img} alt="img.png"></img>
            <div className="incart-mobile-info">
               <div className="name-topping">
                  <p className="name-drink">{product.name}</p>
                  <div className="topping-drink">
                     <p>Size : nhỏ ,Topping : +1 Espresso,+1 Espresso</p>
                  </div>
               </div>

               <div className="total-price-product">
                  <p>{convert.onChangeCurrency(product.price * amount)} đ</p>
               </div>
               <form className="amount-drink-cart">
                  <button
                     className="btn btn-increase"
                     type="button"
                     onClick={onIncreaseAmountProduct}
                  >
                     +
                  </button>
                  <input
                     className="input"
                     type="text"
                     onChange={onCheckedAmount}
                     value={amount}
                     onBlur={onCheckedBlur}
                  />
                  <button
                     className="btn btn-decrease"
                     type="button"
                     onClick={onDecreaseAmountProduct}
                  >
                     -
                  </button>
               </form>
            </div>
            <div className="delete-product-incart">
               <i className="fas fa-times" onClick={onRemoveProduct}></i>
            </div>
         </div>
      </>
   );
};

export default ProductInCart;
