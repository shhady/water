import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { statusValues } from "../constants/IdentifierConstants";
import { baseURL, identifiers } from "../constants/urlConstants.js";

const defaultObj = {
  meaning: "",
  system: "",
  status: "",
  number: 0,
};

const IdentifierForm = () => {
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
      await axios.post(baseURL + identifiers, data);
      console.log("Post request successful!");
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
    }
  };
  const handleUpdate = async () => {
    try {
      const data = { ...formData };
      await axios.put(baseURL + identifiers + "/" + initialData.id, data);
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
      <input
        type="text"
        name="additionalIdentifier"
        value={formData.additionalIdentifier}
        onChange={handleInputChange}
      />
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
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="number"
        value={formData.number}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="latitude"
        value={formData.latitude}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="longitude"
        value={formData.longitude}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default IdentifierForm;
