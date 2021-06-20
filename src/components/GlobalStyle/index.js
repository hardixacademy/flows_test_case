import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
    *{
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: rgba(22,22,22, 0.04);
        color: #161616;
    }
`