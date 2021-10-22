import React, { useState } from "react";
import "./Carousel.css";
import styled, { keyframes } from "styled-components";

function Carousel({ children, countSlide, isShowDot }) {
   const [slideState, setSlideState] = useState(0);
   const [isShowSlide, setIsShowSlide] = useState(0);

   const onChangesSlide = (slide, countSlide) => {
      if (slide + slideState >= 0 && slide + slideState < countSlide) {
         if (slide > 0) {
            setIsShowSlide(true);
            setSlideState(slide + slideState);
         } else {
            setIsShowSlide(false);
            setSlideState(slide + slideState);
         }
      }
   };

   const animationNextSlideShow = keyframes`
         0% {
            left: ${(slideState - 1) * -100}%;
         }
         100% {
            left: ${slideState * -100}%;
         }
      `;

   const animationPreSlideShow = keyframes`
      0% {
         left: ${(slideState + 1) * -100}%;
      }
      100% {
         left: ${slideState * -100}%;
      }
      `;

   const NextSlides = styled.div`
      animation-name: ${animationNextSlideShow};
      left: ${(slideState - 1) * -100}%;
   `;

   const PreSlides = styled.div`
      animation-name: ${animationPreSlideShow};
      left: ${(slideState + 1) * -100}%;
   `;

   const onRenderDot = () => {
      let a = [];
      for (let i = 0; i < countSlide; i++) {
         if (i === slideState) {
            a.push(<div className="dot dot_active"></div>);
         } else {
            a.push(<div className="dot"></div>);
         }
      }
      return a;
   };
   return (
      <>
         <div className="carousel">
            {countSlide > 1 ? (
               <button
                  className="pre-slide rotate_180"
                  onClick={() => {
                     onChangesSlide(-1, countSlide);
                  }}
               >
                  <i className="fas fa-chevron-right"></i>
               </button>
            ) : (
               <></>
            )}

            <div className="carousel_fake">{children}</div>

            {isShowSlide ? (
               <NextSlides className="slides">{children}</NextSlides>
            ) : (
               <PreSlides className="reslides">{children}</PreSlides>
            )}

            {countSlide > 1 ? (
               <button
                  className="next-slide"
                  onClick={() => {
                     onChangesSlide(1, countSlide);
                  }}
               >
                  <i className="fas fa-chevron-right"></i>
               </button>
            ) : (
               <></>
            )}
         </div>
         {isShowDot && countSlide > 1 ? (
            <div className="dot_number">
               <div className="list_dot">{onRenderDot()}</div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
}

export default Carousel;
