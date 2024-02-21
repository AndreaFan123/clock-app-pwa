import useSWR from "swr";

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://worldtimeapi.org/api/timezone/Asia/Taipei",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log(data);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
