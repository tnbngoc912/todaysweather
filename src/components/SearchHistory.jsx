import moment from "moment";
import React from "react";
import IconSearch from "../assets/icon-search.png";
import IconDelete from "../assets/icon-delete.png";

export const SearchHistory = ({ searchHistory, onSearch, onDelete }) => {
  if (!searchHistory || searchHistory.length === 0) {
    return;
  }

  return (
    <ul className="search-history__list">
      {searchHistory.map((historyItem, index) => {
        const {
          sys: { country },
          name: cityName,
          dt,
        } = historyItem;
        const formattedDate = moment.unix(dt).format("DD-MM-YYYY hh:mma");

        return (
          <li key={index} className="search-history__item">
            <div className="wrapper-info">
              <p className="txt-city-name" onClick={() => onSearch(cityName)}>
                {cityName && cityName}
                {country && `, ${country}`}
              </p>
              <p className="txt-date">{formattedDate}</p>
            </div>
            <div className="search-history__actions">
              <button className="btn-action" onClick={() => onSearch(cityName)}>
                <img src={IconSearch} alt="" />
              </button>
              <button
                className="btn-action"
                onClick={() => {
                  onDelete(index);
                }}
              >
                <img src={IconDelete} alt="" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
