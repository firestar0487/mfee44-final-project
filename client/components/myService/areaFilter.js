import React from 'react';

export default function AreaFilter({
  area,
  setArea
}) {
  const toggleArea = (selectedArea) => {
    if (area.includes(selectedArea)) {
      setArea(area.filter(item => item !== selectedArea));
    } else {
      setArea([...area, selectedArea]);
    }
  };

  return (
    <>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check px-0"
          id="btn-check-n"
          checked={area.includes('n')}
          onChange={() => toggleArea('n')}
        />
        <label className="btn px-0 btn-outline-primary" htmlFor="btn-check-n">
          北
        </label>
      </div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check px-0"
          id="btn-check-m"
          checked={area.includes('m')}
          onChange={() => toggleArea('m')}
        />
        <label className="btn px-0 btn-outline-primary" htmlFor="btn-check-m">
          中
        </label>
      </div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check px-0"
          id="btn-check-s"
          checked={area.includes('s')}
          onChange={() => toggleArea('s')}
        />
        <label className="btn px-0 btn-outline-primary" htmlFor="btn-check-s">
          南
        </label>
      </div>
      <style jsx>{`
        .btn-group {
          min-width: 60px;
          margin-inline: 5px;
        }
        input[type='checkbox'] + label {
          background-color:white;
          color:#ff0083;
          border:1px solid #ff0083;
        }
        input[type='checkbox']:checked + label {
          background-color:#ff0083;
          color:white;
        }
      `}</style>
    </>
  );
}
