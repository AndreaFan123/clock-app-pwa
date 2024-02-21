import { useEffect, useState } from "react";
import useSWR from "swr";

function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}&${location.longitude}&key=f4597cf20b81405596ef14f85b36c232`;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR({
    url,
    fetcher,
  });

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

  console.log(data);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
