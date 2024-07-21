import {createGlobalStyle} from "styled-components";
// @ts-ignore
import Regular from "../fonts/Lato-Regular.ttf";
// @ts-ignore
import Bold from "../fonts/Lato-Bold.ttf";

export const Fonts = createGlobalStyle`
    
    @font-face {
        font-family: Lato;
        src: url(${Regular});
        font-weight: 400;
    }

    @font-face {
        font-family: Lato;
        src: url(${Bold});
        font-weight: 600;
    }
    
    body {
        font-family: "Lato", sans-serif;
    }
`;
