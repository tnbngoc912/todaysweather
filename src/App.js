import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import InputSearch from "./components/InputSearch";
import { Switch } from "./components/Switch";
import { ENDPOINT_TODAY_WEATHER, WEATHER_MAP_KEY } from "./constants";

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const handleSearch = async (searchValue) => {
    try {
      if (searchValue !== "") {
        setLoading(true);
        setErrorMessage("");
        const response = await fetch(
          `${ENDPOINT_TODAY_WEATHER}?q=${searchValue}&appid=${WEATHER_MAP_KEY}&units=metric`,
        );
        if (!response.ok) {
          throw new Error("City not found.");
        }
        const data = await response.json();
        setWeatherData(data);

        if (!storedHistory.length) {
          setSearchHistory(weatherData);
          localStorage.setItem("searchHistory", JSON.stringify([data]));
        } else {
          const updatedHistory = [data, ...storedHistory];
          setSearchHistory(updatedHistory);
          localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistoryItem = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    if (!updatedHistory.length) {
      localStorage.removeItem("searchHistory");
      setSearchHistory([]);
    } else {
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, [weatherData]);

  return (
    <div className="container-main">
      <Switch />
      <InputSearch onSearch={handleSearch} />
      <div className={`card ${weatherData && "mt-5"} `}>
        {!weatherData && !searchHistory ? (
          <>empty state</>
        ) : (
          <Card
            onDelete={handleDeleteHistoryItem}
            errorMessage={errorMessage}
            weatherData={weatherData}
            loading={loading}
            searchHistory={searchHistory}
            onSearch={handleSearch}
          />
        )}
      </div>
    </div>
  );
};
export default App;
