import React, { useEffect, useState } from "react";
import cloudFireStore from "../../../../Service/CloudFireStore";
import convert from "../../../../Service/Convert";
import service_amount from "../../../../Service/Service_Amount";
export const ProductTopping = ({ topping, onAddTopping }) => {
   const [amountTopping, setAmountTopping] = useState(0);
   const [toppingItem, setToppingItem] = useState({});
   useEffect(() => {
      cloudFireStore.getDataId("listTopping", topping).then((item) => {
         setToppingItem(item);
      });
   }, [topping]);

   const onServiceAmount = (service, value) => {
      let temp_amount = 0;
      switch (service) {
         case "checked": {
            temp_amount = service_amount.onCheckedAmount(value);
            break;
         }
         case "blur": {
            temp_amount = service_amount.onCheckedBlur(value, 0);

            break;
         }
         case "increase": {
            temp_amount = service_amount.onIncreaseAmountProduct(
               value,
               toppingItem.max_amount
            );
            break;
         }
         case "decrease": {
            temp_amount = service_amount.onDecreaseAmountProduct(value, 0);
            break;
         }
         default: {
            break;
         }
      }
      onAddTopping(topping, temp_amount, toppingItem);
      setAmountTopping(temp_amount);
   };

   const onValue = (e) => {
      const { value } = e.target;
      console.log(value);
      return value;
   };
   return (
      <div className="topping__option-item">
         <div className="topping__option-item-title">
            <p>{toppingItem.name}</p>
            <p>+{convert.onChangeCurrency(toppingItem.price)} đ</p>
         </div>
         <div className="amount-topping">
            <i
               class="fas fa-plus"
               onClick={(e) => {
                  e.preventDefault();
                  onServiceAmount("increase", amountTopping);
               }}
            ></i>
            <input
               type="text"
               className="input"
               value={amountTopping}
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
               class="fas fa-minus"
               onClick={(e) => {
                  e.preventDefault();
                  onServiceAmount("decrease", amountTopping);
               }}
            ></i>
         </div>
      </div>
   );
};
