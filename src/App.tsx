import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import dayTimeBG from "./assets/desktop/bg-image-daytime.jpg";
import nightTimeBG from "./assets/desktop/bg-image-nighttime.jpg";
import sunIcon from "./assets/desktop/icon-sun.svg";
import moonIcon from "./assets/desktop/icon-moon.svg";
import refreshIcon from "./assets/desktop/icon-refresh.svg";

import "./App.css";

function App() {
  return (
    <>
      <header className="bg__container">
        {/* <img src={greetingBG} alt="background" /> */}
      </header>
      <main className="mainContent__container"></main>
    </>
  );
}

export default App;
