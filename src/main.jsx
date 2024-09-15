import React from "react";
import { ThreeDots } from "react-loader-spinner";

function SearchInput({ inputValue, suggestedValues, onInputChange, onSelection,loading }) {
  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestedValues.length > 0) {
      onSelection(suggestedValues[0]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search cities..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded focus:outline-none"
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        role="combobox"
        aria-expanded={suggestedValues.length > 0}
      />
      {loading ? (
        <div className="absolute left-0 right-0 top-full mt-2 flex justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (inputValue && suggestedValues.length > 0 && (
        <ul id="suggestions-list" className="absolute w-full bg-white border mt-1 rounded shadow-lg">
          {suggestedValues.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelection(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default SearchInput;