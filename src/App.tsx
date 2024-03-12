import { useEffect, useState } from "react";
import dayTimeBG from "./asset/desktop/bg-image-daytime.jpg";
import nightTimeBG from "./asset/desktop/bg-image-nighttime.jpg";
import afternoonBG from "./asset/desktop/bg-image-afternoon.jpg";
import sunIcon from "./asset/icon-sun.svg";
import moonIcon from "./asset/icon-moon.svg";
import { QuoteDataType, TimezoneDataTypes } from "./types/type";

import "./App.css";
import { Quote } from "./components/Quote";
import { TimeAndLocation } from "./components/TimeAndLocation";
import { ToggleButton } from "./components/ToggleButton";
import { ExpendInfo } from "./components/ExpendInfo";

function App() {
  const geoApiUrl = import.meta.env.VITE_BIGDATACLOUD;
  const timeApiUrl = import.meta.env.VITE_WORLDTIME;
  const quoteApiUrl = import.meta.env.VITE_QUOTEURL;
  const [showMore, setShowMore] = useState(false);
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
    }

    if (afternoon) {
      return afternoonBG;
    }

    if (nightTime) {
      return nightTimeBG;
    }
  };

  const updateIcon = () => {
    if (dayTime || afternoon) {
      return sunIcon;
    }

    if (nightTime) {
      return moonIcon;
    }
  };

  const updateGreeting = () => {
    if (dayTime) {
      setGreetingText({
        fullTexts: "Good Morning, it's currently",
        shortTexts: "Good Morning",
      });
    }

    if (afternoon) {
      setGreetingText({
        fullTexts: "Good Afternoon, it's currently",
        shortTexts: "Good Afternoon",
      });
    }

    if (nightTime) {
      setGreetingText({
        fullTexts: "Good Evening, it's currently",
        shortTexts: "Good Evening",
      });
    }
  };

  useEffect(() => {
    updateGreeting();
  }, [dayTime, afternoon, nightTime]);

  const handleRefreshQuote = () => {
    getQuote();
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {timeData ? (
        <header className="bg__container">
          <img
            src={updateBG()}
            alt="background"
            style={{
              filter:
                dayTime || afternoon ? "brightness(0.5)" : "brightness(0.8)",
            }}
          />
        </header>
      ) : (
        <header className="bg__container-loader">
          <span className="loader"></span>
        </header>
      )}
      {timeData ? (
        <main className="mainContent__container">
          {!showMore ? (
            <section className="mainContent__quote-container">
              {timeData && quote ? (
                <Quote quote={quote} handleRefreshQuote={handleRefreshQuote} />
              ) : (
                <p>Loading quote...</p>
              )}
            </section>
          ) : null}

          <section
            className="mainContent__container-greeting"
            style={{ top: showMore ? "15%" : "60%" }}
          >
            <TimeAndLocation
              fullTexts={greetingText.fullTexts}
              shortTexts={greetingText.shortTexts}
              formattedTime={formattedTime}
              timeZone={timeData?.abbreviation}
              country={location.country}
              city={location.city}
              icon={updateIcon() as string}
            />

            <div className="expendMore__container">
              <ToggleButton onShowMore={handleShowMore} showMore={showMore} />
            </div>
          </section>
        </main>
      ) : null}
      {timeData && showMore && (
        <div
          className="expendInfo__container-table"
          style={{
            backgroundColor: dayTime ? "#fff" : "#000",
            transform: showMore ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <span></span>
          <ExpendInfo
            currentTimezone={timeData.timezone}
            dayOfYear={timeData.day_of_year}
            dayOfWeek={timeData.day_of_week}
            weekNumber={timeData.week_number}
            dayTime={dayTime}
          />
        </div>
      )}
    </>
  );
}

export default App;
