import React from 'react';

const TypeFilter = ({ types, selectedType, onChange }) => {
  return (
    <div className="type-filter">
      <label htmlFor="typeFilter">Filter by Type:</label>
      <select
        id="typeFilter"
        onChange={(e) => onChange(e.target.value)}
        value={selectedType}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeFilter;
