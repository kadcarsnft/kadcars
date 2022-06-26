import { Children } from "react";
import styled from "styled-components";

const blackGradient = `linear-gradient(
  50deg,
  hsl(0deg 0% 0%) 0%,
  hsl(0deg 0% 2%) 2%,
  hsl(0deg 0% 2%) 17%,
  hsl(0deg 0% 3%) 40%,
  hsl(0deg 0% 4%) 57%,
  hsl(0deg 0% 5%) 68%,
  hsl(0deg 0% 6%) 77%,
  hsl(0deg 0% 6%) 83%,
  hsl(0deg 0% 6%) 88%,
  hsl(0deg 0% 6%) 92%,
  hsl(0deg 0% 6%) 96%,
  hsl(0deg 0% 5%) 98%,
  hsl(0deg 0% 5%) 100%
);`;

// const pinkGradient = `linear-gradient(
//   50deg,
//   hsl(307deg 86% 58%) 0%,
//   hsl(307deg 83% 59%) 1%,
//   hsl(307deg 79% 60%) 13%,
//   hsl(307deg 76% 61%) 33%,
//   hsl(307deg 80% 64%) 47%,
//   hsl(307deg 85% 67%) 58%,
//   hsl(307deg 91% 70%) 67%,
//   hsl(307deg 92% 71%) 74%,
//   hsl(307deg 94% 72%) 81%,
//   hsl(308deg 96% 73%) 86%,
//   hsl(308deg 96% 75%) 91%,
//   hsl(308deg 96% 77%) 96%,
//   hsl(308deg 96% 79%) 100%
// );`
const pinkGradient = `linear-gradient(
  50deg,
  hsl(300deg 88% 33%) 0%,
  hsl(303deg 89% 35%) 4%,
  hsl(305deg 89% 37%) 13%,
  hsl(306deg 90% 38%) 29%,
  hsl(307deg 89% 40%) 46%,
  hsl(307deg 89% 41%) 60%,
  hsl(307deg 89% 43%) 71%,
  hsl(307deg 87% 45%) 79%,
  hsl(306deg 85% 47%) 85%,
  hsl(306deg 84% 48%) 90%,
  hsl(309deg 79% 53%) 94%,
  hsl(312deg 82% 56%) 97%,
  hsl(315deg 84% 58%) 100%
);`

export const CardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2229;
  overflow: hidden;
`;

export const Separator = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 310px;
  // grid-template-rows: 30px 225px 125px 35px 100px;
  // grid-template-areas: "model" "image" "text" "vin" "stats";
  grid-template-rows: 40px 315px 30px 115px;
  grid-template-areas: "model" "image" "vin" "stats";
  border-radius: 10px;
  background: #000;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
`;

export const ExpandedCardWrapper = styled.div`
  display: flex;
  alignSelf: center;
  width: 80vw;
  height: 80vh;
  border-radius: 18px;
  background: #000;
  box-shadow: 5px 5px 15px rgba(89, 48, 229, 0.9);
  margin-top: 40px;
  text-align: center;
  z-index: 999;
  position: absolute;
`;

/*********** model related components ************/
export const CardModelWrapper = styled.div`
  text-align: left;
  grid-area: model;
  // background: #5930e5;
  // background: #f854e4;
  // background: black;
  background-image: ${blackGradient};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  margin-left: 10px;

`;
export const CardModelText = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 20;
  font-size: 18px;
  height: 100%;
`;
/************************************************/

/*********** image related components ************/
export const CardImageWrapper = styled.div`
  grid-area: image; 
  // border-top-left-radius: 15px;
  // border-top-right-radius: 15px;
  // background-size: cover;
  background-size: cover;
  background-image: url(${props => props.image});
  width: 100%;
`;
/************************************************/

export const CardTextWrapper = styled.div`
  grid-area: text;
  margin: 25px;
`;

export const CardTextTitle = styled.h2`
  margin-top: 0px;
  font-size: 2rem;
  box-sizing: border-box;
  min-width: 0px;
  line-height: 1.2;
  margin: 0px;
  background: linear-gradient(
    110.78deg,
    rgb(118, 230, 80) -1.13%,
    rgb(249, 214, 73) 15.22%,
    rgb(240, 142, 53) 32.09%,
    rgb(236, 81, 87) 48.96%,
    rgb(255, 24, 189) 67.94%,
    rgb(26, 75, 255) 85.34%,
    rgb(98, 216, 249) 99.57%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const CardTextBody = styled.p`
  color: grey;
  font-size: 15px;
  font-weight: 300;
`;

/********* Vin Related Components ********/
export const CardVinWrapper = styled.div`
  display: grid;
  grid-area: vin;
  // background: #5930e5;
  // background: #f854e4;
  background-image: ${pinkGradient};
`;
  
export const CardVinText = styled.p`
  color: whitesmoke;
  font-size: 15px;
  font-weight: 600;
`;
/*****************************************/


/************* Stat Related Components ************/
export const CardStatWrapper = styled.div`
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  // background: #5930e5;
  // background: #f854e4;
  // background: #000;
  background-image: ${blackGradient}
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const CardStatGrid = styled.div`
  display: grid;
  grid-template-columns: 53% 40%;
  color: white;
  font-size: 15px;
  text-align: left;
  // background: red;
  // padding: 10px;
`;

export const CardStatLabel = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  color: white;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  width: 100%;
  margin-left: 5px;
  // background: green
  // padding: 10px;
`;

export const CardStatValue = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #f854e4;
  font-size: 13px;
  text-align: left;
  font-weight: 200;
  width: 100%;
  margin-left: 7px;
  // background: green
  // padding: 10px;
`;
/*****************************************/


export const LinkText = styled.a`
  color: #fff;
  text-decoration: none;
`;