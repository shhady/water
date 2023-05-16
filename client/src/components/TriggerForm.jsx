import { useState } from "react";
import axios from "axios";
import {
  meaningValues,
  statusValues,
  systemValues,
} from "../constants/TriggerConstants";
import { baseURL, triggers } from "../constants/urlConstants.js";

const defaultObj = {
  meaning: "",
  system: "",
  status: "",
  number: 0,
};

const TriggerForm = () => {
  const initialData = JSON.parse(localStorage.getItem("form-data"));
  const [formData, setFormData] = useState(initialData || defaultObj);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      data.trigger = meaningValues.findIndex(
        (value) => value === formData.meaning
      );
      await axios.post(baseURL + triggers, data);
      console.log("Post request successful!");
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="meaning"
        value={formData.meaning}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select Value
        </option>
        {meaningValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        name="system"
        value={formData.system}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select Option
        </option>
        {systemValues.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select Item
        </option>
        {statusValues.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="number"
        value={formData.number}
        onChange={handleInputChange}
        placeholder="Number"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TriggerForm;
