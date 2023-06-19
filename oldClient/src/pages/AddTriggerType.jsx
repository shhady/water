import { useEffect, useRef, useState } from "react";
import { FormRow } from "../components";

function TriggerType() {
  const [triggerType, setTriggerType] = useState("");
  const [triggerName, setTriggerName] = useState("");
  const [triggerTypeError, setTriggerTypeError] = useState("");
  const [triggersType, setTriggersType] = useState([]);
  const [triggersName, setTriggersName] = useState([]);
  const [showAddTriggerType, setShowAddTriggerType] = useState(false);
  const [showAddTriggerName, setShowAddTriggerName] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedName, setSelectedName] = useState([]);

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
    const names = [];
    triggersName.forEach((item) => {
      if (item.type === event.target.value) names.push(item.name);
    });
    setSelectedName(names);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Perform form submission logic
    console.log("handle submit");
  };

  console.log(triggerType);
  console.log(triggerName);
  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">Trigger Type</label>
          <select name="" id="" onChange={handleTypeChange}>
            <option value="">Select Type</option>
            {triggersType?.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={(event) => setShowAddTriggerType(!showAddTriggerType)}
          >
            Add new Trigger Type
          </button>
          {showAddTriggerType && !selectedType && (
            <input
              type="text"
              onChange={(event) => setTriggerType(event.target.value)}
            />
          )}
        </div>

        {(selectedType || showAddTriggerType) && (
          <div>
            <label htmlFor="">Trigger name</label>
            <br />
            {selectedName && !showAddTriggerType && (
              <select>
                <option value="">Select Name</option>
                {selectedName.map((name, index) => {
                  return <option key={index}>{name}</option>;
                })}
              </select>
            )}
            <button
              type="button"
              onClick={(event) => setShowAddTriggerName(!showAddTriggerName)}
            >
              Add new Trigger name
            </button>
            {showAddTriggerName && (
              <input
                type="text"
                onChange={(event) => setTriggerName(event.target.value)}
              />
            )}
          </div>
        )}

        <div>{triggerTypeError}</div>
        <button type="submit">Add Trigger Type</button>
      </form>
    </>
  );
}

export default TriggerType;
