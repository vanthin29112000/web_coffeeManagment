import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import cloudFireStore from "../../../Service/CloudFireStore";
import convert from "../../../Service/Convert";
import service_amount from "../../../Service/Service_Amount";
import "./InformationProduct.css";
import { ProductTopping } from "./ProductTopping";
const InformationProduct = ({ onAddIncart }) => {
   const pagrams = new useParams();
   const history = new useHistory();
   const [idProduct, setIdProduct] = useState("");
   const [product, setProduct] = useState({});
   const [sumPrice, setSumPrice] = useState(0);
   const [productIncart, setProductIncart] = useState({
      amount: 1,
      info: {
         id_product: pagrams.id,
         note: "",
         size: {},
         topping: [],
      },
      total_price: 0,
   });

   useEffect(() => {
      setProductIncart({ ...productIncart, total_price: sumPrice });
   }, [sumPrice]);

   useEffect(() => {
      setIdProduct(pagrams.id);
      cloudFireStore
         .getDataId("ListProduct", pagrams.id)
         .then((product) => {
            setProduct(product);
            let temp_productIncart = {
               ...productIncart.info,
               size: product.size[0],
            };

            setProductIncart({
               ...productIncart,
               info: { ...temp_productIncart },
            });
         })
         .catch((error) => {
            console.log(error);
         });
   }, [pagrams]);

   useEffect(() => {
      onSumPrice();
   }, [productIncart]);

   const onSumPrice = () => {
      let sum = 0;
      productIncart.info.topping.forEach((element) => {
         sum += element.info.price * element.amount;
      });
      sum += product.price + productIncart.info.size.price;
      setSumPrice(sum);
   };

   const onServiceAmount = (service, value) => {
      switch (service) {
         case "checked": {
            setProductIncart({
               ...productIncart,
               amount: service_amount.onCheckedAmount(value),
            });
            break;
         }
         case "blur": {
            setProductIncart({
               ...productIncart,
               amount: service_amount.onCheckedBlur(value, 1),
            });
            break;
         }
         case "increase": {
            setProductIncart({
               ...productIncart,
               amount: service_amount.onIncreaseAmountProduct(value, 99),
            });
            break;
         }
         case "decrease": {
            setProductIncart({
               ...productIncart,
               amount: service_amount.onDecreaseAmountProduct(value, 1),
            });
            break;
         }
         default: {
            break;
         }
      }
   };

   const onValue = (e) => {
      const { value } = e.target;
      console.log(value);
      return value;
   };

   const onChangeValue = (e) => {
      e.preventDefault();
      let { name, value } = e.target;
      let temp_value = { ...productIncart };

      switch (name) {
         case "size": {
            const size_option = product.size.filter(
               (item) => item.name === value
            );
            let temp_info = { ...temp_value.info, size: size_option[0] };
            temp_value = { ...temp_value, info: { ...temp_info } };
            setProductIncart(temp_value);
            break;
         }
         default: {
            temp_value.info[name] = value;
            setProductIncart(temp_value);
            break;
         }
      }
   };

   const onAddTopping = (id, amount, info) => {
      let temp_productIncart = { ...productIncart };
      if (temp_productIncart.info.topping.length === 0) {
         temp_productIncart.info.topping.push({
            id: id,
            info: info,
            amount: amount,
         });
      } else {
         const index = temp_productIncart.info.topping.findIndex(
            (item) => item.id === id
         );
         if (index !== -1) {
            temp_productIncart.info.topping[index].amount = amount;
         } else {
            temp_productIncart.info.topping.push({
               id: id,
               info: info,
               amount: amount,
            });
         }
      }
      temp_productIncart.info.topping = temp_productIncart.info.topping.filter(
         (item) => item.amount !== 0
      );
      setProductIncart(temp_productIncart);
   };

   const onAddIncartToCustomer = (e) => {
      e.preventDefault();
      onAddIncart(productIncart);
      history.goBack();
   };

   return (
      <>
         <div className="infomation-product-container">
            <div className="infomation-product showSlide">
               <div className="infomation-product-left">
                  <img src={product.img}></img>
                  <div className="product-title">
                     <h3>Thông tin sản phẩm</h3>
                     <p>{product.info}</p>
                  </div>
                  <div className="btn-infomation-product">
                     <button
                        className="btn btn-back-pc"
                        onClick={() => {
                           history.goBack();
                        }}
                     >
                        <i className="fas fa-arrow-right"></i>
                        Quay trở lại
                     </button>
                  </div>
               </div>
               <div className="infomation-product-right">
                  <h1>{product.name}</h1>
                  <div className="price-amount">
                     <p className="price-product">
                        {convert.onChangeCurrency(product.price)} đ
                     </p>
                     <div className="amount-product">
                        <i
                           class="fas fa-plus-circle icon-plus"
                           onClick={(e) => {
                              e.preventDefault();
                              onServiceAmount("increase", productIncart.amount);
                           }}
                        ></i>
                        <input
                           type="text"
                           className="input"
                           value={productIncart.amount}
                           name="amount"
                           onChange={(e) => {
                              e.preventDefault();
                              const value = onValue(e);
                              onServiceAmount("checked", value);
                           }}
                           onBlur={(e) => {
                              e.preventDefault();
                              const value = onValue(e);
                              onServiceAmount("blur", value);
                           }}
                        ></input>
                        <i
                           class="fas fa-minus-circle icon-minus"
                           onClick={(e) => {
                              e.preventDefault();
                              onServiceAmount("decrease", productIncart.amount);
                           }}
                        ></i>
                     </div>
                  </div>
                  <div className="note-product">
                     <i class="far fa-clipboard"></i>
                     <input
                        type="input"
                        className="input"
                        placeholder="Ghi chú cho món này"
                        name="note"
                        onChange={onChangeValue}
                        value={productIncart.info.note}
                     ></input>
                  </div>
                  <div className="size-topping">
                     <p className="size-topping__title">Chọn size</p>
                     <div className="size-topping__option">
                        {Object.keys(product).length !== 0
                           ? product.size.map((item, index) =>
                                index === 0 ? (
                                   <>
                                      <div
                                         className="size-topping__option-item"
                                         key={index}
                                      >
                                         <input
                                            type="radio"
                                            name="size"
                                            id={item.name}
                                            value={item.name}
                                            onChange={onChangeValue}
                                            defaultChecked
                                         ></input>
                                         <label for={item.name}>
                                            {item.title} +
                                            {convert.onChangeCurrency(
                                               item.price
                                            )}
                                            đ
                                         </label>
                                      </div>
                                   </>
                                ) : (
                                   <div
                                      className="size-topping__option-item"
                                      key={index}
                                   >
                                      <input
                                         type="radio"
                                         name="size"
                                         id={item.name}
                                         value={item.name}
                                         onChange={onChangeValue}
                                      ></input>
                                      <label for={item.name}>
                                         {item.title} +
                                         {convert.onChangeCurrency(item.price)}đ
                                      </label>
                                   </div>
                                )
                             )
                           : null}
                     </div>
                     {Object.keys(product).length !== 0 &&
                     product.topping.length !== 0 ? (
                        <>
                           <p className="topping__title">Chọn Topping</p>
                           <div className="topping__option">
                              {product.topping.map((item, index) => (
                                 <ProductTopping
                                    topping={item.id_topping}
                                    onAddTopping={onAddTopping}
                                    key={index}
                                 ></ProductTopping>
                              ))}
                           </div>{" "}
                        </>
                     ) : null}
                  </div>
                  <button
                     className="btn btn-add-incart"
                     onClick={onAddIncartToCustomer}
                  >
                     {`${convert.onChangeCurrency(
                        sumPrice * productIncart.amount
                     )} đ`}{" "}
                     - Thêm vào giỏ hàng
                  </button>
                  <button
                     className="btn btn-back-mobile"
                     onClick={() => {
                        history.goBack();
                     }}
                  >
                     <i className="fas fa-arrow-right"></i>
                     Quay trở lại
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
export default InformationProduct;
