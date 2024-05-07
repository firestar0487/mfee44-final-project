import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Search({ textSearch, setTextSearch }) {
  const [localTextSearch, setLocalTextSearch] = useState(textSearch);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalTextSearch(value);
    if (value.trim() === '') {
      setTextSearch(''); // 如果輸入值為空，則設置父元件的狀態為空
    }
  };

  const handleButtonClick = () => {
    setTextSearch(localTextSearch);
  };

  return (
    <>
      <div className="input-group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="button-addon1"
          onClick={handleButtonClick}
        >
          <CiSearch />
        </button>
        <input
          className="flex-grow-1"
          type="text"
          placeholder="    城市、街道、店名"
          aria-describedby="button-addon1"
          value={localTextSearch}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
