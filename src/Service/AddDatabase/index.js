import React from "react";
import cloudFireStore from "../../Service/CloudFireStore";
import fileImg from "../../Service/fileImg";
export const AddDataBase = () => {
   const listProduct = [
      {
         name: "espresso (1 Shot)",
         info: "“Present is present “ Hiện tại là quà tặng mà cuộc sống, thiên nhiên ban tặng cho mỗi chúng ta. Hãy yêu thương và trân trọng từng khoảnh khắc yên bình!",
         url: "https://www.facebook.com/connectingart2020/photos/a.103327217939306/290520199220006/",
         timeline: "Chủ Nhật 02/05 (8h-10h30)",
         date: new Date(),
      },
   ];

   const onSubmitUpload = (e) => {
      e.preventDefault();
      const files = e.target.files;
      let listTemp = [];
      for (let i = 0; i < files.length; i++) {
         cloudFireStore.addData(listProduct[i], "ListActivate").then((id) => {
            fileImg
               .uploadFile(files[0], "ListActivate/" + id)
               .then((url) => {
                  listTemp.push(url);
                  return url;
               })
               .then((url) => {
                  cloudFireStore.updateData("ListActivate", id, { img: url });
               })
               .catch((error) => {
                  console.log(error);
               });
         });
      }
      console.log("listTemp", listTemp);
   };
   return (
      <div>
         <form>
            <input
               type="file"
               onChange={(e) => onSubmitUpload(e)}
               multiple
            ></input>
            <button type="submit">upload</button>
         </form>
      </div>
   );
};
