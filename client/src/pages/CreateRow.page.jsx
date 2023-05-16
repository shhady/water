import React, { useState } from "react";
import axios from "axios";

const CreateRow = ({ apiUrl, stringArray }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, formData);
      console.log("Post request successful!");
      // You can perform additional actions here upon successful POST request
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {stringArray.map((string, index) => (
        <input
          key={index}
          type="text"
          name={`input${index}`}
          value={formData[`input${index}`] || ""}
          onChange={handleInputChange}
          placeholder={`Enter value ${index + 1}`}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateRow;
