import moment from "moment";

const checkTime = (text) => {
   if (text.length === 1) {
      text = "0" + text;
   }
   return text;
};

const convert = {
   secondToTime: (time_unix) => {
      let date = new Date(time_unix * 1000);
      let day = "" + date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${year}-${checkTime(month)}-${checkTime(day)}`;
   },
   onChangeCurrency: (number) => {
      return new Intl.NumberFormat().format(number);
   },
   onChangeToTime: (time_unix) => {
      return `${moment(time_unix * 1000).format("MM/DD/YYYY")}
         ${moment(time_unix * 1000).format("LT")}`;
   },
};

export default convert;
