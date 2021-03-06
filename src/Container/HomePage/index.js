import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Activate from "../../Component/Activate";
import Contact from "../../Component/Contact";
import InfomationAccount from "../../Component/InfomationAccount";
import UpdatePassword from "../../Component/InfomationAccount/UpdatePassword";
import ListProducts from "../../Component/ListProducts";
import InformaitonProduct from "../../Component/ListProducts/InformationProduct";
import { NavBar } from "../../Component/Navbar";
import Notify from "../../Component/Notify";
import onShowAlert from "../../Component/Notify/CheckShowNotify";
import OrderHistory from "../../Component/OrderHisroty";
import ShoppingCart from "../../Component/ShoppingCart";
import SlideShowBanner from "../../Component/SlideShowBanner";
import { Confirm } from "../../Layout/Confirm";
import Loading from "../../Layout/Loading";
import AuthFireBase from "../../Service/Auth";
import cloudFireStore from "../../Service/CloudFireStore";
import isEqual from "../../Service/IsEqual";
import random from "../../Service/RandomId";
import AuthCustomer from "../AuthCustomer";
import "./HomePage.css";

const HomePage = () => {
   const [user, setUser] = useState("");
   const [infoUser, setInfoUser] = useState({});
   const [listProduct, setListProduct] = useState([]); // all product
   const [listProductIncart, setListProductIncart] = useState([]);
   const [isShowLoading, setIsShowLoading] = useState(false);
   const [notify, setNotify] = useState({
      isShow: "",
      type: "",
      mess: "",
   });

   useEffect(() => {
      setIsShowLoading(true);
      onGetListProduct();
      onAuthStateChanged(getAuth(), (userID) => {
         //
         if (!userID) return;
         setUser(userID.uid);
         cloudFireStore.getDataId("Customer", userID.uid).then((info) => {
            setInfoUser(info);
         });
      });
   }, []);

   useEffect(() => {
      if (user !== "") {
         cloudFireStore.getDataId("Customer", user).then((customer) => {
            const temp = customer.inCart;
            setListProductIncart(temp);
         });
      }
      setIsShowLoading(false);
   }, [user]);

   const updateListProductIncart = (listProduct, mess, isShow) => {
      //update inCart
      cloudFireStore
         .updateData("Customer", user, { inCart: listProduct })
         .then((flag) => {
            if (flag === true) {
               setListProductIncart(listProduct);
               if (isShow === true) {
                  onShowAlertNotify(mess, "1");
               } else {
                  setNotify({
                     ...notify,
                     isShow: "",
                  });
               }
            }
         })
         .catch((error) => {
            onShowAlertNotify(error, "3");
         });
   };

   const onShowAlertNotify = (mess, type) => {
      onShowAlert(mess, type, setNotify);
   };

   const onSignOut = () => {
      AuthFireBase.SignOut()
         .then((userId) => {
            console.log("th??nh c??ng ", userId);
            onShowAlertNotify("????ng xu???t th??nh c??ng !!", "1", setNotify);
            setUser("");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const onGetListProduct = () => {
      //get all product in doc "ListProduct" (Firebase)
      let list = [];
      cloudFireStore
         .getAllData("ListProduct")
         .then((doc) => {
            doc.forEach((item) => {
               list.push({ info: item.data(), id: item.id });
            });
            setListProduct(list);
         })
         .catch((error) => {
            console.log("error", error);
         });
   };

   const onUpdateProfileUser = (user_info) => {
      setInfoUser(user_info);
      console.log("day ne", user_info);
      cloudFireStore
         .updateData("Customer", user, user_info)
         .then(() => {
            onShowAlertNotify("Thay ?????i th??ng tin th??nh c??ng", "1");
         })
         .catch((error) => {
            onShowAlertNotify(error, "3");
         });
   };

   const onAddIncart = (product) => {
      const listProduct = [...listProductIncart];
      if (user === "") {
         onShowAlertNotify("Vui l??ng ????ng nh???p ????? th??m v??o gi??? h??ng !", "2");
      } else {
         for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].info.id_product === product.info.id_product) {
               console.log(
                  "isequal",
                  isEqual.isEqualObject(product.info, listProduct[i].info)
               );
               if (
                  isEqual.isEqualObject(product.info, listProduct[i].info) ===
                  true
               ) {
                  listProduct[i].amount += product.amount;
                  setListProductIncart(listProduct);
                  updateListProductIncart(
                     listProduct,
                     "Th??m v??o gi??? h??ng th??nh c??ng",
                     true
                  );
                  return;
               }
            }
         }
         let id_incart = random.randomId();

         let temp_product_incart = {
            ...product,
            id_incart: id_incart,
         };
         listProduct.push(temp_product_incart);
         setListProductIncart(listProduct);
         updateListProductIncart(
            listProduct,
            "Th??m v??o gi??? h??ng th??nh c??ng",
            true
         );
      }
   };

   return (
      <>
         <Loading isShow={isShowLoading}></Loading>
         {notify.isShow !== "" ? (
            <Notify
               type={notify.type}
               message={notify.mess}
               isShow={notify.isShow}
               setNotify={() => {
                  setNotify({
                     ...notify,
                     isShow: false,
                  });
               }}
            ></Notify>
         ) : null}
         <NavBar
            user={user}
            onSignOut={onSignOut}
            onShowAlertNotify={onShowAlertNotify}
         ></NavBar>
         <div className="homepage">
            <div className="homepage__container">
               <section className="homepage__carousel">
                  <SlideShowBanner></SlideShowBanner>
               </section>
               <ListProducts
                  user={user}
                  inCart={listProductIncart}
                  updateListProductIncart={updateListProductIncart}
                  listProduct={listProduct}
               ></ListProducts>
               <Activate></Activate>
               <Contact></Contact>
            </div>
            <Switch>
               <Route path={`/ShoppingCart`}>
                  <ShoppingCart
                     user={user}
                     infoUser={infoUser}
                     onShowAlertNotify={onShowAlertNotify}
                     listProductIncart={listProductIncart}
                     listProduct={listProduct}
                     updateListProductIncart={updateListProductIncart}
                     onShowAlertNotify={onShowAlertNotify}
                  ></ShoppingCart>
               </Route>
               <Route path="/Auth-customer">
                  <AuthCustomer setNotify={onShowAlertNotify}></AuthCustomer>
               </Route>
               {/* Account */}
               <Route path="/info-account">
                  <InfomationAccount
                     user_info={infoUser}
                     onUpdateProfileUser={onUpdateProfileUser}
                  ></InfomationAccount>
               </Route>
               <Route path="/update-password">
                  <UpdatePassword
                     userID={user}
                     infoUser={infoUser}
                     onShowAlertNotify={onShowAlertNotify}
                  ></UpdatePassword>
               </Route>

               <Route path="/info-product/:id">
                  <InformaitonProduct
                     onAddIncart={onAddIncart}
                  ></InformaitonProduct>
               </Route>
               <Route path="/order-history">
                  <OrderHistory userID={user}></OrderHistory>
               </Route>
            </Switch>
         </div>
      </>
   );
};
export default HomePage;
