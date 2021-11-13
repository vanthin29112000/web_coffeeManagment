import { updatePassword } from "@firebase/auth";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Confirm } from "../../../Layout/Confirm";
import AuthFireBase from "../../../Service/Auth";
import "./UpdatePassword.css";
const UpdatePassword = ({ user, infoUser, onShowAlertNotify }) => {
   const history = new useHistory();
   const [password, setPassword] = useState({
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
   });

   const [isShowPass, setIsShowPass] = useState({
      oldPassword: true,
      newPassword: true,
      newPasswordAgain: true,
   });

   const [isShowWarning, setIsShowWarning] = useState({
      oldPassword: {
         isShow: false,
         messShow: 0,
         mess: ["Vui lòng nhập mật khẩu hiện tại", "Mật khẩu cũ không đúng"],
      },
      newPassword: {
         isShow: false,
         messShow: 0,
         mess: [
            "Vui lòng nhập mật khẩu mới",
            "Vui lòng nhập mật khẩu đủ 6 kí tự trở lên",
         ],
      },
      newPasswordAgain: {
         isShow: false,
         messShow: 0,
         mess: [
            "Vui lòng nhập lại mật khẩu mới",
            "Mật khẩu nhập lại không đúng",
         ],
      },
   });

   const [confirmShow, setComfirmShow] = useState({
      isShow: false,
      mess: "",
      accept: false,
   });

   useEffect(() => {
      if (confirmShow.accept) {
         AuthFireBase.updatePassword(password.newPassword)
            .then(() => {
               history.push("/");
               onShowAlertNotify("Đổi mật khẩu thành công !", "1");
            })
            .catch((error) => {
               console.log(error);
            });
      }
   }, [confirmShow]);

   const onChangeValue = (e) => {
      e.preventDefault();
      const { value, name } = e.target;
      console.log(value, name);
      setPassword({ ...password, [name]: value });
   };

   const onChangeIsShowPass = (name) => {
      setIsShowPass({ ...isShowPass, [name]: !isShowPass[name] });
   };

   const onChangeMessWarning = (name, isShow, mess) => {
      let temp = { ...isShowWarning };
      temp[name].isShow = isShow;
      temp[name].messShow = mess;
      setIsShowWarning(temp);
   };

   const onCheckIsShowWarning = () => {
      const field = Object.keys(password);
      let temp = { ...isShowWarning };
      let flag = true;
      for (let key of field) {
         if (password[key] === "") {
            temp[key].isShow = true;
            temp[key].messShow = 0;
            flag = false;
         } else {
            temp[key].isShow = false;
         }
      }
      if (flag === true) {
         if (password.newPassword === password.newPasswordAgain) {
            if (password.newPassword.length >= 6) {
               onChangeMessWarning("newPasswordAgain", false, 0);
            } else {
               flag = false;
               onChangeMessWarning("newPassword", true, 1);
            }
         } else {
            flag = false;
            onChangeMessWarning("newPasswordAgain", true, 1);
         }
      }

      setIsShowWarning(temp);
      return flag;
   };

   const onUpdatePassword = (e) => {
      e.preventDefault();
      if (onCheckIsShowWarning() === true) {
         AuthFireBase.Login(infoUser.email, password.oldPassword)
            .then(() => {
               console.log("ok");
               onShowConfirm("Bạn có thực sự muốn đổi mật khẩu");
               onChangeMessWarning("oldPassword", false, 0);
            })
            .catch((error) => {
               console.log(error);
               onChangeMessWarning("oldPassword", true, 1);
            });
      }
   };

   const onShowConfirm = (mess) => {
      let temp = { ...confirmShow };
      temp.isShow = true;
      temp.mess = mess;
      setComfirmShow(temp);
   };

   return (
      <>
         <Confirm
            isShow={confirmShow.isShow}
            mess={confirmShow.mess}
            onAccept={() => {
               setComfirmShow({ ...confirmShow, accept: true });
            }}
            onBack={() => {
               console.log("back");
               setComfirmShow({ ...confirmShow, isShow: false });
            }}
         ></Confirm>
         <div className="update-password-container">
            <form
               className="update-password-bg showSlide"
               onSubmit={onUpdatePassword}
            >
               <i
                  className="far fa-times-circle btn-close"
                  onClick={() => {
                     history.goBack();
                  }}
               ></i>
               <h3 className="update-password__title">Thay đổi mật khẩu</h3>
               <div className="infomation-account__item">
                  <p>Mật khẩu cũ</p>
                  <div className="infomation-account__item-in">
                     <input
                        type={isShowPass.oldPassword ? "password" : "text"}
                        className="input"
                        name="oldPassword"
                        onChange={onChangeValue}
                        value={updatePassword.oldPassword}
                     ></input>

                     <i
                        class={
                           isShowPass.oldPassword
                              ? "far fa-eye-slash"
                              : "far fa-eye"
                        }
                        onClick={() => {
                           onChangeIsShowPass("oldPassword");
                        }}
                     ></i>
                  </div>
                  {isShowWarning.oldPassword.isShow ? (
                     <div className="notify">
                        <p>
                           {
                              isShowWarning.oldPassword.mess[
                                 isShowWarning.oldPassword.messShow
                              ]
                           }
                        </p>
                     </div>
                  ) : null}
               </div>

               <div className="infomation-account__item">
                  <p>Mật khẩu mới</p>
                  <div className="infomation-account__item-in">
                     <input
                        type={isShowPass.newPassword ? "password" : "text"}
                        className="input"
                        name="newPassword"
                        onChange={onChangeValue}
                        value={updatePassword.newPassword}
                     ></input>

                     <i
                        class={
                           isShowPass.newPassword
                              ? "far fa-eye-slash"
                              : "far fa-eye"
                        }
                        onClick={() => {
                           onChangeIsShowPass("newPassword");
                        }}
                     ></i>
                  </div>
                  {isShowWarning.newPassword.isShow ? (
                     <div className="notify">
                        <p>
                           {
                              isShowWarning.newPassword.mess[
                                 isShowWarning.newPassword.messShow
                              ]
                           }
                        </p>
                     </div>
                  ) : null}
               </div>

               <div className="infomation-account__item">
                  <p>Nhập lại mật khẩu</p>
                  <div className="infomation-account__item-in">
                     <input
                        type={isShowPass.newPasswordAgain ? "password" : "text"}
                        className="input"
                        name="newPasswordAgain"
                        onChange={onChangeValue}
                        value={updatePassword.newPasswordAgain}
                     ></input>

                     <i
                        class={
                           isShowPass.newPasswordAgain
                              ? "far fa-eye-slash"
                              : "far fa-eye"
                        }
                        onClick={() => {
                           onChangeIsShowPass("newPasswordAgain");
                        }}
                     ></i>
                  </div>
                  {isShowWarning.newPasswordAgain.isShow ? (
                     <div className="notify">
                        <p>
                           {
                              isShowWarning.newPasswordAgain.mess[
                                 isShowWarning.newPasswordAgain.messShow
                              ]
                           }
                        </p>
                     </div>
                  ) : null}
               </div>
               <div className="infomation-account__button">
                  <button className="btn btn-save" type="submit">
                     Lưu thay đổi
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};
export default UpdatePassword;
