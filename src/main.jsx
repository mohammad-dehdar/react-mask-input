import React, { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { validateInput } from "./validation";

function SearchInput({ inputValue, suggestedValues, onInputChange, onSelection, loading }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const validationError = validateInput(newValue);
    if (!validationError) {
      onInputChange(newValue);
      setActiveIndex(-1);
      setError("");
    } else {
      setError(validationError);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < suggestedValues.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestedValues.length) {
        onSelection(suggestedValues[activeIndex]);
      } else if (suggestedValues.length > 0) {
        onSelection(suggestedValues[0]);
      }
    } else if (e.key === "Escape") {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (listRef.current && activeIndex >= 0) {
      const activeElement = listRef.current.children[activeIndex];
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search cities..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 border rounded focus:outline-none ${error ? 'border-rose-500' : ''}`}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        role="combobox"
        aria-expanded={suggestedValues.length > 0}
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
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
        <ul
          id="suggestions-list"
          ref={listRef}
          className="absolute w-full bg-white border mt-1 rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestedValues.map((suggestion, index) => (
            <li
              key={index}
              id={`suggestion-${index}`}
              className={`p-2 cursor-pointer transition duration-150 ease-in-out ${index === activeIndex ? 'bg-green-100' : 'hover:bg-green-50'
                }`}
              onClick={() => onSelection(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              aria-selected={index === activeIndex}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default SearchInput;