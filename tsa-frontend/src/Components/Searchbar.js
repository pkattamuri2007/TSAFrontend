import React, { useState } from "react";
import "./Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import symData from "../data/data.json";
function SearchBar({ placeholder, data, onDataSubmit }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.symptom.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const onSubmitHandler = (event) => {
    for (let i = 0; i < symData.length; i++) {
      if (symData[i].symptom === event.target.textContent) {
        onDataSubmit([event.target.textContent, symData[i].id]);
        setFilteredData([]);
        setWordEntered("");
      }
    }
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <button
                key={key}
                onClick={onSubmitHandler}
                className="dataItem"
                href={value.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{value.symptom}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
