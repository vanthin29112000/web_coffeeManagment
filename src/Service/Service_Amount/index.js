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
   onCheckedBlur: (value, defaultValueMin, defaultValueMax) => {
      //set limit = 1
      if (value > defaultValueMax) {
         return defaultValueMax;
      }
      if (value < defaultValueMin) {
         return defaultValueMin;
      } else {
         return value;
      }
   },
   onIncreaseAmountProduct: (value, maxValue) => {
      console.log("increase", value);

      let amountProduct = Number(value);
      if (amountProduct < maxValue) {
         amountProduct++;
         return amountProduct;
      } else {
         return maxValue;
      }
   },
   onDecreaseAmountProduct: (value, defaultValue) => {
      console.log("des", value);

      let amountProduct = Number(value);
      if (amountProduct > defaultValue) {
         amountProduct--;
         return amountProduct;
      } else {
         return defaultValue;
      }
   },
};

export default service_amount;
