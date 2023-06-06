import { useEffect, useRef, useState } from "react";
import { FormRow } from "../components";

function TriggerType() {
  const [triggerType, setTriggerType] = useState("");
  const [triggerName, setTriggerName] = useState("");
  const [triggerTypeError, setTriggerTypeError] = useState("");
  const [triggersType, setTriggersType] = useState([]);
  const [triggersName, setTriggersName] = useState([]);
  const newTriggerType = useRef(null);
  const newTriggerName = useRef(null);
  const [selectedType, setSelectedType] = useState("");
  useEffect(() => {
    const url = "http://localhost:5000/TriggerTypes";
    const getTriggersType = async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const types = [];
      const names = [];
      data.data.forEach((item) => {
        if (!types.includes(item.type)) {
          types.push(item.type);
        }
        if (!names.some((obj) => obj._id === item._id)) {
          names.push(item);
        }
      });
      setTriggersType(types);
      setTriggersName(names);
    };

    getTriggersType();
  }, []);
  console.log(triggersName);
  console.log(triggersType);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handelAddNewTriggerType = (event) => {
    event.preventDefault();
    const postNode = document.createElement("input");
    newTriggerType.current.appendChild(postNode);

    postNode.addEventListener("input", (event) => {
      // Update triggerType state or perform other actions
      setTriggerType(event.target.value);
    });
  };

  const handelAddNewTriggerName = (event) => {
    event.preventDefault();
    const postNode = document.createElement("input");
    newTriggerName.current.appendChild(postNode);

    postNode.addEventListener("input", (event) => {
      // Update triggerName state or perform other actions
      setTriggerName(event.target.value);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Perform form submission logic
  };

  console.log(triggerType);
  console.log(triggerName);
  return (
    <>
      <form onSubmit={submitHandler}>
        <div ref={newTriggerType}>
          <label htmlFor="">Trigger Type</label>
          <select name="" id="" onChange={handleTypeChange}>
            <option value="">Select Type</option>
            {triggersType?.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          <button onClick={handelAddNewTriggerType}>
            Add new Trigger Type
          </button>
        </div>

        {selectedType && (
          <div ref={newTriggerName}>
            <label htmlFor="">Trigger name</label>
            <button onClick={handelAddNewTriggerName}>
              Add new Trigger name
            </button>
          </div>
        )}

        <div>{triggerTypeError}</div>
        <button type="submit">Add Trigger Type</button>
      </form>
    </>
  );
}

export default TriggerType;
