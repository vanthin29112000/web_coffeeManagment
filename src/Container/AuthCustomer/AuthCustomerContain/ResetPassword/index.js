import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthFireBase from "../../../../Service/Auth";
import "./ResetPassword.css";
export const ResetPassword = () => {
   const history = new useHistory();
   const [email, setEmail] = useState("");
   const [isShowNotify, SetIsShowNotify] = useState(true);

   const onChangeValue = (e) => {
      e.preventDefault();
      const { value, name } = e.target;

      setEmail(value);
   };

   const onSubmitReset = (e) => {
      e.preventDefault();
      AuthFireBase.reserPassword(email)
         .then(() => {
            console.log("thành cong");
            SetIsShowNotify(false);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <>
         {isShowNotify ? (
            <div className="reset-pass-container">
               <form
                  className="reset-pass-bg showSlide"
                  onSubmit={onSubmitReset}
               >
                  <h2>Quên mật khẩu ?</h2>
                  <input
                     id="email-reset"
                     type="email"
                     className="input"
                     onChange={onChangeValue}
                     value={email}
                     placeholder="Vui lòng nhập Email đã đăng kí"
                     required
                  ></input>
                  <div className="submit-reset">
                     <button className="btn btn-reset-pass" type="submit">
                        Quên mật khẩu
                     </button>
                  </div>
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
               </form>
            </div>
         ) : (
            <div className="reset-pass-container">
               <form className="reset-pass-bg showSlide">
                  <h3>Hãy kiểm tra Gmail {email} của bạn !!!</h3>
                  <div className="btn-turn-back">
                     <button
                        className=" btn"
                        onClick={() => {
                           history.push("/");
                        }}
                     >
                        <i className="fas fa-arrow-right "></i>
                        <p>Quay lại trang chủ</p>
                     </button>
                  </div>
               </form>
            </div>
         )}
      </>
   );
};
