import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    overflow: hidden;
  }

  body {
    font-family: "Poppins", sans-serif;
    background: linear-gradient(90deg, rgba(64,50,105,1) 0%, rgba(27,28,162,1) 100%);
    /* height: 100vh;
    width: 100vw; */
    padding: 0;
    margin: 0;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
