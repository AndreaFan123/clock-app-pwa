import { useState, useEffect } from "react";
import useSWR from "swr";

export const useGetLocationAndTime = () => {
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  // fetch location
  const fetchLocation = async () => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    );
    const data = await response.json();
    setLocation({
      city: data.city,
      country: data.countryName,
    });
  };

  // fetch coordinates
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        try {
          setCoords({
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
};
