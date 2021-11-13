import React, { useState } from "react";
import { useHistory } from "react-router";
import Notify from "../../../../Component/Notify";
import onShowAlert from "../../../../Component/Notify/CheckShowNotify";
import AuthFireBase from "../../../../Service/Auth";
import cloudFireStore from "../../../../Service/CloudFireStore";

export const SigninCustomer = ({ setIsShowAlert }) => {
   const [isShowPass, setIsShowPass] = useState(false);
   const [isShowPassAgain, setIsShowPassAgain] = useState(false);
   const [password, setPassword] = useState("");
   const [passwordAgain, setPasswordAgain] = useState("");
   const [email, setEmail] = useState("");

   const [notify, setNotify] = useState({
      isShow: "",
      mess: "",
      type: "",
   });

   const history = new useHistory();

   const onChangeShowPass = () => {
      const flag = isShowPass;
      setIsShowPass(!flag);
   };

   const onChangeShowPassAgain = () => {
      const flag = isShowPassAgain;
      setIsShowPassAgain(!flag);
   };

   const onChangeValue = (e) => {
      e.preventDefault();
      const { value, name } = e.target;
      switch (name) {
         case "email":
            setEmail(value);
            break;
         case "pass":
            setPassword(value);
            break;
         case "passAgain":
            setPasswordAgain(value);
            break;
         default:
            break;
      }
   };

   const onSignIn = (e) => {
      e.preventDefault();

      if (password.length <= 6) {
         onShowAlert("Mật khẩu tối thiểu 8 chữ số", "3", setNotify);
         return;
      }
      if (password !== passwordAgain) {
         onShowAlert("Mật khẩu nhập lại không đúng", "3", setNotify);
      } else {
         if (password !== "" && passwordAgain !== "" && email !== "") {
            AuthFireBase.SignIn(email, password)
               .then((user) => {
                  console.log("login", user.user.uid);
                  const temp = {
                     name: "",
                     phoneNumber: "",
                     email: email,
                     address: "",
                     birthDay: new Date(),
                     dateCreated: new Date(),
                     gender: "",
                     inCart: [],
                  };
                  cloudFireStore
                     .addDataId(user.user.uid, temp, "Customer")
                     .then(() => {
                        setIsShowAlert("Đăng kí thành công !", "1");
                        history.push("/info-account");
                     });
               })
               .catch((error) => {
                  console.log("error", error.code);
                  if (error.code === "auth/email-already-in-use") {
                     onShowAlert("Tài khoản này đã tồn tại", "3", setNotify);
                  } else {
                     onShowAlert(error.code, "3", setNotify);
                  }
               });
         }
      }
   };

   return (
      <>
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
         <div className="login-customer showSlide">
            <div className="login-customer__title ">
               <div className="login-customer__title-text">
                  <p>Chào mừng thành viên mới,</p>
                  <h1>Đăng kí !</h1>
               </div>
               <div className="login-customer__title-bg"></div>
            </div>
            <form
               className="login-customer__input-container"
               onSubmit={onSignIn}
            >
               <div className="login-customer__input">
                  <p className="login-customer__input-title">Email</p>
                  <div className="">
                     <input
                        type="Email"
                        className="input"
                        name="email"
                        placeholder="Email"
                        onChange={onChangeValue}
                        required
                     ></input>
                  </div>
               </div>
               <div className="login-customer__input">
                  <p className="login-customer__input-title">Mật khẩu</p>
                  {isShowPass ? (
                     <div className="password">
                        <input
                           type="text"
                           className="input"
                           placeholder="Mật khẩu"
                           name="pass"
                           onChange={onChangeValue}
                           required
                        ></input>
                        <i
                           className="far fa-eye"
                           onClick={() => onChangeShowPass()}
                        ></i>
                     </div>
                  ) : (
                     <div className="password">
                        <input
                           type="password"
                           className="input"
                           placeholder="Mật khẩu"
                           name="pass"
                           onChange={onChangeValue}
                           required
                        ></input>

                        <i
                           className="far fa-eye-slash"
                           onClick={() => onChangeShowPass()}
                        ></i>
                     </div>
                  )}
               </div>
               <div className="login-customer__input">
                  <p className="login-customer__input-title">
                     Nhập lại mật khẩu
                  </p>
                  {isShowPassAgain ? (
                     <div className="password">
                        <input
                           type="text"
                           className="input"
                           placeholder="Nhập lại mật khẩu"
                           name="passAgain"
                           onChange={onChangeValue}
                           required
                        ></input>
                        <i
                           className="far fa-eye"
                           onClick={() => onChangeShowPassAgain()}
                        ></i>
                     </div>
                  ) : (
                     <div className="password">
                        <input
                           type="password"
                           className="input"
                           placeholder="Mật khẩu"
                           name="passAgain"
                           onChange={onChangeValue}
                           required
                        ></input>

                        <i
                           className="far fa-eye-slash"
                           onClick={() => onChangeShowPassAgain()}
                        ></i>
                     </div>
                  )}
               </div>
               <div className="signin-login">
                  <button className="Login-customer btn">Đăng Kí</button>
               </div>
            </form>
            <div className="btn-turn-back">
               <button
                  className=" btn"
                  onClick={() => {
                     history.goBack();
                  }}
               >
                  <i className="fas fa-arrow-right "></i>
                  <p>Quay lại</p>
               </button>
            </div>
         </div>
      </>
   );
};
