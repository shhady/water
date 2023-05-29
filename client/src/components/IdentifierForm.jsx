import { useState } from "react";
import axios from "axios";
import { useNavigate, statusValues, baseURL, identifiers } from "./index.js";

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
      <div>
        <label htmlFor="additionalIdentifier">additional Identifier</label>
        <input
          id="additionalIdentifier"
          type="text"
          name="additionalIdentifier"
          value={formData.additionalIdentifier}
          onChange={handleInputChange}
          placeholder="additionalIdentifier"
        />
      </div>
      <div>
        <label htmlFor="status">status</label>
        <select
          placeholder="status"
          id="status"
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
      </div>
      <div>
        <label htmlFor="city">city</label>
        <input
          placeholder="city"
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="street">street</label>
        <input
          type="text"
          id="street"
          placeholder="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="number">number</label>
        <input
          id="number"
          placeholder="number"
          type="number"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="latitude">latitude</label>
        <input
          placeholder="latitude"
          id="latitude"
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="longitude">longitude</label>
        <input
          id="longitude"
          placeholder="longitude"
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IdentifierForm;
