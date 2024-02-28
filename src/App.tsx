import { useEffect, useMemo, useState } from "react";
import dayTimeBG from "../public/asset/desktop/bg-image-daytime.jpg";
import nightTimeBG from "../public/asset/desktop/bg-image-nighttime.jpg";
import afternoonBG from "../public/asset/desktop/bg-image-afternoon.jpg";
import refreshIcon from "../public/asset/icon-refresh.svg";

import "./App.css";
import { QuoteDataType, TimezoneDataTypes } from "./types/type";

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en

function App() {
  const geoApiUrl = import.meta.env.VITE_BIGDATACLOUD;
  const timeApiUrl = import.meta.env.VITE_WORLDTIME;
  const quoteApiUrl = import.meta.env.VITE_QUOTEURL;
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [location, setLocation] = useState({
    continent: "",
    city: "",
    country: "",
  });
  const [timeData, setTimeData] = useState<TimezoneDataTypes | null>(null);
  const [quote, setQuote] = useState<QuoteDataType | null>(null);
  const [greetingText, setGreetingText] = useState({
    fullTexts: "",
    shortTexts: "",
  });
  const date = timeData ? new Date(timeData.datetime) : new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  const hour = date.getHours();
  const dayTime = hour >= 6 && hour < 12;
  const afternoon = hour >= 12 && hour < 18;
  const nightTime = hour >= 18 && hour < 24;

  const getCoords = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        try {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log(error);
          }
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getLocation = async (latitude: number, longitude: number) => {
    try {
      const geoResData = await fetch(
        `${geoApiUrl}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      ).then((response) => response.json());
      setLocation({
        continent: geoResData.continent,
        city: geoResData.city,
        country: geoResData.countryCode,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const getTime = async (continent: string, city: string) => {
    try {
      const timeResData = await fetch(
        `${timeApiUrl}/${continent}/${city}`
      ).then((response) => response.json());
      setTimeData(timeResData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const getQuote = async () => {
    try {
      const quoteResData = await fetch(`${quoteApiUrl}`).then((response) =>
        response.json()
      );
      setQuote(quoteResData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      getLocation(coords.latitude, coords.longitude);
    }
  }, [coords]);

  useEffect(() => {
    if (location.continent && location.city) {
      getTime(location.continent, location.city);
    }
  }, [location]);

  useEffect(() => {
    getQuote();
  }, []);

  const updateBG = () => {
    if (dayTime) {
      return dayTimeBG;
    } else if (afternoon) {
      return afternoonBG;
    } else if (nightTime) {
      return nightTimeBG;
    }
  };

  useEffect(() => {
    if (dayTime) {
      setGreetingText({
        fullTexts: "Good Morning, it's currently",
        shortTexts: "Good Morning",
      });
    } else if (afternoon) {
      setGreetingText({
        fullTexts: "Good Afternoon, it's currently",
        shortTexts: "Good Afternoon",
      });
    } else if (nightTime) {
      setGreetingText({
        fullTexts: "Good Evening, it's currently",
        shortTexts: "Good Evening",
      });
    }
  }, [dayTime, afternoon, nightTime]);

  const handleRefreshQuote = () => {
    getQuote();
  };

  return (
    <>
      <header className="bg__container">
        {timeData ? (
          <img src={updateBG()} alt="background" />
        ) : (
          <p>Loading...</p>
        )}
      </header>
      <main className="mainContent__container">
        <div className="mainContent__container-quote">
          {quote ? (
            <>
              <div className="mainContent__quote-texts">
                <p>"{quote.content}"</p>
                <span>{quote.author}</span>
              </div>
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
            </>
          ) : (
            <p>Loading quote...</p>
          )}
        </div>
        <div className="mainContent__container-greeting">
          {/* <img src={timeIcon} alt="time icon" /> */}
          <span>{greetingText.fullTexts}</span>
          <span>{formattedTime}</span>
          <span>{location.city}</span>
        </div>
      </main>
    </>
  );
}

export default App;
