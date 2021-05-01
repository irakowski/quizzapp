import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore
import BGImage from '../../images/kelly.jpg'

export const GlobalStyle = createGlobalStyle`
  html {
      height: 100%;
  }
  body {
      margin: 0;
      padding: 0 20px;
      display: flex;
      background-image: url(${BGImage}); 
      background-size: cover;
      justify-content: center;
  }

  * {
      box-sizing: border-box
  }

`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p { 
      color: white;
  }
  .score {
      color: white;
      font-size: 1em;
      margin: 0
  }
  h1 {
    background-image: linear-gradient(180deg, #fff, #87f1ff)
    background-size: 100%;
    background-clip: text;
    --webkit-background-clip: text;
    --webkit-text-fill-color: transparent;
    --moz-background-clip: text;
    --moz-text-fill-color: transparent;
    color: white;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin: 20px;
}
 .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
    border-radius: 10px;
    height:40px;
    margin: 20px 0;
    padding:0 40px;

    .start {
        max-width: 200px
    }
 }
  `