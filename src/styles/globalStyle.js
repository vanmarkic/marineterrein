import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,200;0,300;0,400;0,700;0,900;1,300&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
    }
    html {
      margin: 0;  
      background-color: #fafaf3;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23d2d0b3' fill-opacity='0.4'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    body {
      font-family: "Helvetica", "Overpass", sans-serif;
    }

`

export default GlobalStyle