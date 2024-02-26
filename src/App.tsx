import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import dayTimeBG from "./assets/desktop/bg-image-daytime.jpg";
import nightTimeBG from "./assets/desktop/bg-image-nighttime.jpg";
import sunIcon from "./assets/desktop/icon-sun.svg";
import moonIcon from "./assets/desktop/icon-moon.svg";
import refreshIcon from "./assets/desktop/icon-refresh.svg";

import "./App.css";

function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const time = new Date().getHours();
  const isDayTime = time > 6 && time < 18;
  const greetingBG = isDayTime ? dayTimeBG : nightTimeBG;
  const greetingText = isDayTime
    ? "GOOD MORNING, IT’S CURRENTLY"
    : "GOOD EVENING, IT’S CURRENTLY";
  const timeIcon = isDayTime ? sunIcon : moonIcon;
  const geoApiUrl = import.meta.env.VITE_OPENCAGEURL;
  const geoApiKey = import.meta.env.VITE_OPENCAGEAPIKEY;
  const geoFullUrl = location
    ? `${geoApiUrl}${location.latitude}%2C${location.longitude}&key=${geoApiKey}`
    : null;
  const quoteApiUrl = import.meta.env.VITE_QUOTEURL;
  const geoFetcher = (url: string) => fetch(url).then((res) => res.json());
  const quoteFetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: geoInfo, error: geoInfoErrpr } = useSWR(geoFullUrl, geoFetcher);
  const { data: quoteInfo, error: quoteError } = useSWR(
    quoteApiUrl,
    quoteFetcher
  );

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        try {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          alert(error);
        }
      });
    } else {
      console.log("Geolocation is not available");
    }
  };

  const handleRefreshQuote = () => {
    mutate(quoteApiUrl);
  };

  useEffect(() => {
    getLocation();
  }, []);

  console.log(geoInfo);

  return (
    <>
      <header className="bg__container">
        <img src={greetingBG} alt="background" />
      </header>
      <main className="mainContent__container">
        <div className="mainContent__container-quote">
          {quoteInfo ? (
            <>
              <div className="mainContent__quote-container">
                <div className="mainContent__quote-content">
                  <p>"{quoteInfo.content}"</p>
                  <button
                    type="button"
                    className="mainContent__quote-refreshBtn"
                    onClick={handleRefreshQuote}
                  >
                    <img
                      src={refreshIcon}
                      alt="Refresh icon, click to refresh quote"
                    />
                  </button>
                </div>
                <span>{quoteInfo.author}</span>
              </div>
            </>
          ) : (
            <p>Loading quote...</p>
          )}
        </div>
        <div className="mainContent__container-greeting">
          <img src={timeIcon} alt="time icon" />
          <span>{greetingText}</span>
        </div>
      </main>
    </>
  );
}

export default App;
