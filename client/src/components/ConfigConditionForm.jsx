import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  meaningValues,
  baseURL,
  configConditions,
} from "./index.js";

const defaultObj = {
  meaning: "",
  system: "",
  status: "",
  number: 0,
};

const ConfigConditionForm = () => {
  const initialData = JSON.parse(localStorage.getItem("form-data"));
  const [formData, setFormData] = useState(initialData || defaultObj);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePost = async () => {
    try {
      const data = { ...formData };
      await axios.post(baseURL + configConditions, data);
      console.log("Post request successful!");
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
    }
  };
  const handleUpdate = async () => {
    try {
      const data = { ...formData };
      await axios.put(baseURL + configConditions + "/" + initialData.id, data);
      console.log("Post request successful!");
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      handleUpdate();
    } else {
      handlePost();
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="systemId">system Id</label>
        <input
          id="systemId"
          type="text"
          name="systemId"
          value={formData.systemId}
          onChange={handleInputChange}
          placeholder="systemId"
        />
      </div>
      <div>
        <label htmlFor="previousSystemId">previous System Id</label>
        <input
          type="text"
          id="previousSystemId"
          name="previousSystemId"
          value={formData.previousSystemId}
          onChange={handleInputChange}
          placeholder="previousSystemId"
        />
      </div>
      <div>
        <label htmlFor="type">type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          placeholder="type"
          id="type"
        />
      </div>
      <div>
        <label htmlFor="triggerName">trigger Name</label>
        <select
          id="triggerName"
          name="triggerName"
          value={formData.triggerName}
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
      </div>
      <div>
        <label htmlFor="measuredValue">measured Value</label>
        <input
          id="measuredValue"
          type="number"
          name="measuredValue"
          value={formData.measuredValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="valueType">value Type</label>
        <input
          id="valueType"
          type="text"
          name="valueType"
          value={formData.valueType}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConfigConditionForm;
