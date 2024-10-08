import React, { useState } from 'react';
import SearchInput from './main.jsx';
import citiesData from "./cities.json";

function Parent() {
  const [inputValue, setInputValue] = useState("");
  const [suggestedValues, setSuggestedValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value) => {
    setInputValue(value);
    setLoading(true);

    if (value.trim() === "") {
      setSuggestedValues("");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const filteredCities = citiesData.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
  
      setSuggestedValues(filteredCities.slice(0, 5));
      setLoading(false); 
    }, 500);
    //  تأخیر مصنوعی 500 میلی‌ثانیه‌ای برای شبیه‌سازی یک درخواست ایجاد می‌کند
    // حداکثر 5 پیشنهاد را نشان می‌دهد که اگر تعداد دیتا زیاد بود تمام دیتا را به ما پیشنهاد ندهد
  };

  const handleSelection = (selectedCity) => {
    setInputValue(selectedCity);
    setSuggestedValues([]);
  };

  const deletHandler = () => {
    setInputValue("");
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <SearchInput 
        inputValue={inputValue}
        suggestedValues={suggestedValues}
        onInputChange={handleInputChange}
        onSelection={handleSelection}
        deletHandler={deletHandler}
        loading={loading}
      />
    </div>
  );
}

export default Parent;