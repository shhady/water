import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const CreateRow = () => {
  const [formData, setFormData] = useState({});
  const stringArray = JSON.parse(localStorage.getItem("inputs-array"));
  const apiUrl = localStorage.getItem("post-url");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(apiUrl, formData);
      console.log("Post request successful!");
      // You can perform additional actions here upon successful POST request
      setIsLoading(false);
      history.push("/home"); // Replace with your desired home page route
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle error cases
      setIsLoading(false);
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
          placeholder={string}
        />
      ))}
      <button type="submit">Submit</button>
      {isLoading && <CircularProgress />}
    </form>
  );
};

export default CreateRow;
