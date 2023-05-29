import React, { useState } from "react";
import TableLookUps from "../constants/TableLookUps";

const CheckboxList = ({ options, checkedItems, setCheckedItems }) => {
  const handleCheckboxChange = (event, index) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, index]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    }
  };

  return (
    <div>
      {options.map((option, index) => (
        <label key={option._id}>
          <input
            type="checkbox"
            value={option.name}
            checked={checkedItems.includes(index + 1)}
            onChange={(event) => handleCheckboxChange(event, index + 1)}
          />
          {option.name}
        </label>
      ))}
      <p>
        {TableLookUps("Checked Items")}: {JSON.stringify(checkedItems)}
      </p>
    </div>
  );
};

export default CheckboxList;
