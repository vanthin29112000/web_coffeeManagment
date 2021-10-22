import React from "react";
import "./Contact.css";
const Contact = () => {
   return (
      <div id="Contactpage">
         <div className="contact__container">
            <div className="contact__bg">
               <div className="contact__left">
                  <div className="contact">
                     <div className="contact__img">
                        <img src="\logo512.png"></img>
                     </div>
                     <p className="contact__title">
                        𝙀𝙠𝙤 𝘾𝙤𝙛𝙛𝙚𝙚 - 𝘾𝙖̆𝙣 𝙉𝙝𝙖̀ 𝙌𝙪𝙚̂ 𝙢𝙖́𝙩 𝙢𝙚̉ 𝙤̛̉ 𝙎𝙖̀𝙞 𝙂𝙤̀𝙣
                        <p>
                           {" "}
                           Nếu bạn không thích ồn ào và khói bụi, thì về đây nhe
                           !!
                        </p>
                     </p>
                  </div>
               </div>
               <div className="contact__right">
                  <div className="contact__right-container">
                     <p className="contact__right-title">Liên hệ </p>
                     <div className="contact__right-item">
                        <i class="fas fa-mobile-alt"></i>
                        <div className="contact__right-info">
                           <p className="title">Hotline đặt hàng</p>
                           <p className="info">+92255884433</p>
                        </div>
                     </div>

                     <div className="contact__right-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div className="contact__right-info">
                           <p className="title">Địa chỉ cửa hàng</p>
                           <p className="info">
                              369/3, Phạm Văn Chiêu, Quận Gò Vấp
                           </p>
                        </div>
                     </div>
                     <div className="contact__right-item">
                        <i class="fab fa-facebook-square"></i>
                        <div className="contact__right-info">
                           <p className="title">Fanpage </p>
                           <a
                              href="https://www.facebook.com/EKO-Coffee-352446845301232"
                              className="info"
                           >
                              Eko Coffee
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Contact;
