import React, { useState } from "react";
import IconSearch from "../assets/icon-search.png";

const InputSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    setSearchValue("");
  };

  return (
    <form onSubmit={handleSearch} className={`input-form`}>
      <input
        type="text"
        placeholder="City"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button type="submit" className="btn-search">
        <img src={IconSearch} alt="" />
      </button>
    </form>
  );
};

export default InputSearch;
