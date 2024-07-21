import React from "react";
import "./App.css";
import {Providers} from "./Providers";
import Main from "./pages/Main/main";
import {Fonts} from "./style/fonts.styled";

function App() {
    return (
        <Providers>
            <Fonts />
            <Main />
        </Providers>
    );
}

export default App;
