import ImageSunny from "../assets/img-sunny.png";
import LocationNotFound from "../assets/location-not-found.svg";
import EmptyStateImage from "../assets/empty-state.svg";

import moment from "moment";
import { SearchHistory } from "./SearchHistory";

export const Card = ({
  weatherData,
  loading,
  searchHistory,
  onSearch,
  errorMessage,
  onDelete,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weatherData) {
    if (searchHistory.length) {
      return (
        <>
          {errorMessage !== "" && (
            <div className="wrapper-not-found">
              <img
                className="img-not-found 1"
                src={LocationNotFound}
                alt="img-location-not-found"
              />
              <p>{errorMessage}</p>
              <p>Please try again</p>
            </div>
          )}
          <div className="search-history">
            Search history
            <SearchHistory
              searchHistory={searchHistory}
              onSearch={onSearch}
              onDelete={onDelete}
            />
          </div>
        </>
      );
    }
    return (
      <div className="wrapper-empty-state">
        <img
          className="img-empty-state"
          src={EmptyStateImage}
          alt="empty-state-img"
        />
        <p>Please enter a city or country to see the weather.</p>
      </div>
    );
  }

  const {
    main: { temp, temp_min, temp_max, humidity },
    sys: { country },
    weather: [{ main: weatherMain }],
    dt,
    name: cityName,
  } = weatherData;

  const formattedDate = moment.unix(dt).format("DD-MM-YYYY hh:mma");

  return (
    <>
      <div className="wrapper">
        {errorMessage !== "" ? (
          <div className="wrapper-not-found">
            <img
              className="img-not-found"
              src={LocationNotFound}
              alt="img-location-not-found"
            />
            {errorMessage}
          </div>
        ) : (
          <>
            <img className="img-sunny" src={ImageSunny} alt="img-sunny" />
            <div className="container-title">
              <div>
                <p className="card__title">Today's Weather</p>
                <p className="card__tempurature">{Math.round(temp)}°</p>
                <p>
                  <span>H: {Math.round(temp_max)}</span>{" "}
                  <span>L: {Math.round(temp_min)}</span>
                </p>
                <strong>
                  {cityName && cityName}
                  {country && `, ${country}`}
                </strong>
              </div>
              <div className="card__more-info">
                <div className="wrapper-info-title">
                  <p>{formattedDate}</p>
                  <p>Humidity: {humidity}%</p>
                  <p>{weatherMain}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {!searchHistory || !searchHistory.length ? (
          <></>
        ) : (
          <div className="search-history mt-3">
            Search history
            <SearchHistory
              searchHistory={searchHistory}
              onSearch={onSearch}
              onDelete={onDelete}
            />
          </div>
        )}
      </div>
    </>
  );
};
