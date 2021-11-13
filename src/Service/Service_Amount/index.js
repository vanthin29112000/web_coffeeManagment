const service_amount = {
   onCheckedAmount: (value) => {
      //checked is NAN
      const amountProduct = Number(value);

      if (value === "") {
         console.log("checked", 0, value);
         return 0;
      }

      if (!isNaN(amountProduct)) {
         console.log("checked", amountProduct, value);
         return amountProduct;
      } else {
         return 0;
      }
   },
   onCheckedBlur: (value, defaultValue) => {
      //set limit = 1
      if (value == 0) {
         return defaultValue;
      }
   },
   onIncreaseAmountProduct: (value, maxValue) => {
      let amountProduct = Number(value);
      if (amountProduct < maxValue) {
         amountProduct++;
         return amountProduct;
      } else {
         return amountProduct;
      }
   },
   onDecreaseAmountProduct: (value, defaultValue) => {
      let amountProduct = Number(value);
      if (amountProduct > defaultValue) {
         amountProduct--;
         return amountProduct;
      } else {
         return amountProduct;
      }
   },
};

export default service_amount;
