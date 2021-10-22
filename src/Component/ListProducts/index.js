import React, { useEffect, useState } from "react";
import cloudFireStore from "../../Service/CloudFireStore";
import "./ListProducts.css";
import ProductItem from "./ProductItem";
const ListProducts = () => {
   const [category, setCategory] = useState([]);
   const [categoryActive, setCategoryActive] = useState("");
   const [listProduct, setListProduct] = useState([]); // all product
   const [listProductShow, setListProductShow] = useState([]); //list product show UI
   const [isShowList, setIsShowList] = useState(false);

   useEffect(() => {
      window.scrollBy(0, 0);
      onGetAllCategory();
      onGetListProduct();
   }, []);

   useEffect(() => {
      onGetListProductJSX(12);
      //show 12 item product
   }, [categoryActive, listProduct]);

   const onGetListProduct = () => {
      //get all product in doc "ListProduct" (Firebase)
      let list = [];
      cloudFireStore
         .getAllData("ListProduct")
         .then((doc) => {
            doc.forEach((item) => {
               list.push(item.data());
            });
            setListProduct(list);
         })
         .catch((error) => {
            console.log("error", error);
         });
   };

   const onGetAllCategory = () => {
      //get all category in doc "Category" (Firebase)
      let listCategory = [];
      cloudFireStore
         .getAllData("Category")
         .then((category) => {
            category.forEach((item) => {
               listCategory.push(item.data());
            });
            listCategory.sort((item_1, item_2) => item_1.stt - item_2.stt);
            setCategory(listCategory);
         })
         .catch((error) => {
            console.log("error", error);
         });
   };

   //Change Category
   const onChangeActiveCategory = (id) => {
      setCategoryActive(id);
   };

   const onGetListProductJSX = (count) => {
      // filter list product with category
      let countTemp = 0;
      let filterList = [];

      if (listProduct.length > 0) {
         if (categoryActive !== "") {
            const temp = [];
            listProduct.forEach((ele) => {
               if (ele.category === categoryActive) {
                  temp.push(ele);
               }
            });
            filterList = [...temp];
         } else {
            filterList = [...listProduct];
         }
      } else {
         return;
      }

      // // count == 0 => all : count > 0 ==> count
      if (count !== 0) {
         const temp = [];
         filterList.forEach((ele) => {
            if (countTemp < count) {
               temp.push(ele);
            }
            countTemp++;
         });
         filterList = [...temp];
      }

      setListProductShow(filterList);

      // // set show button "Show more"
      if (countTemp > count) {
         setIsShowList(true);
      } else {
         setIsShowList(false);
      }
   };

   return (
      <div className="listproduct" id="Orderpage">
         <div className=" grid wide listproduct__container">
            <div className="row no-gutters">
               <div className="col l-12 m-12 c-12">
                  <p className="listproduct__title">
                     <i class="fas fa-trophy"></i> Sản phẩm từ EKO
                  </p>
                  <div className="category">
                     {category.map((ele, index) => {
                        return (
                           <div
                              className={
                                 ele.id.localeCompare(categoryActive) === 0
                                    ? "category__item active__item-category"
                                    : "category__item"
                              }
                              onClick={() => {
                                 onChangeActiveCategory(ele.id);
                              }}
                              key={index}
                           >
                              <div className="category__item-icon ">
                                 <img src={ele.url} alt="icon.png"></img>
                              </div>
                              <p className="category__title">{ele.title}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
         <div className="grid wide">
            <div className="row">
               {listProductShow.length > 0 ? (
                  listProductShow.map((ele, index) => (
                     <ProductItem infoProduct={ele} key={index}></ProductItem>
                  ))
               ) : (
                  <p className="notify-empty-product">
                     Hiện tại chưa có món trong Menu này
                  </p>
               )}
            </div>
            {isShowList ? (
               <button
                  className="btn btn-showmore"
                  onClick={() => onGetListProductJSX(0)}
               >
                  Xem tất cả <i class="fas fa-arrow-right"></i>
               </button>
            ) : null}
         </div>
      </div>
   );
};
export default ListProducts;
