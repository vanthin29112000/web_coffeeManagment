const onShowAlert = (mess, type, setIsShow) => {
   const temp = {
      isShow: true,
      mess: mess,
      type: type,
   };

   setIsShow(temp);

   setTimeout(() => {
      setIsShow({
         ...temp,
         isShow: false,
      });
   }, 3000);
};

export default onShowAlert;
