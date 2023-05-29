import { useState } from "react";
import { FormRow } from "../components";

function TriggerType() {
  const [triggerType, setTriggerType] = useState("");
  const [triggerTypeError, setTriggerTypeError] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    console.log(triggerType);

    if (!triggerType) {
      setTriggerTypeError("Invalid");
      return;
    }

    setTriggerTypeError("");

    const url = "http://localhost:5000/TriggerTypes";
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "POST";

    try {
      fetch(url, {
        method: method,
        body: JSON.stringify({ name: triggerType }), // Wrap triggerType in an object to match your API's expected payload
        headers: headers,
      })
        .then((response) => {
          // Handle the response
          console.log(response);
          return response.json(); // Parse the response as JSON
        })
        .then((data) => {
          // Use the response data
          console.log("Data", data);
          if (data.error) {
            setTriggerTypeError(data.error);
          }
        })
        .catch((error) => {
          // Handle any errors during the fetch request
          console.error(error);
        });
    } catch (error) {
      // Handle any other errors
      console.error(error);
    }
  }

  return (
    <>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          name="triggerType"
          id="triggerType"
          minLength="2"
          placeholder="Trigger Type"
          value={triggerType} // Add the value prop to bind the input to the state
          onChange={(e) => {
            setTriggerType(e.target.value);
          }}
        />
        <div>{triggerTypeError}</div>
        <button type="submit">Add Trigger Type</button>
      </form>
    </>
  );
}

export default TriggerType;
