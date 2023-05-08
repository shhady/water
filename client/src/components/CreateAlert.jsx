import { useState, useRef } from "react";
import "../styles/CreateAlert.css";

const CreateAlert = () => {
  const [trigger, setTrigger] = useState(null);
  const parameterRef = useRef(null);
  const typeRef = useRef(null);
  const valueRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const addressRef = useRef(null);
  const statusRef = useRef(null);

  const submitHandler = () => {
    const data = {
      t1: trigger,
      P2: parameterRef.current.value,
      city: cityRef.current.value,
      street: streetRef.current.value,
      addr: addressRef.current.value,
    };
    //send request
  };

  return (
    <form className="CreateAlert">
      <select onChange={(e) => setTrigger(e.target.value)}>
        <option value=""> -- Trigger -- </option>
        <option value="cyber-attack">Cyber Attack</option>
        <option value="water-pollution">ًWater Pollution</option>
      </select>
      <input ref={parameterRef} placeholder="Parameter" type="text" />
      <input ref={typeRef} placeholder="Type" type="text" />
      <input ref={valueRef} placeholder="Value" type="number" />
      <input ref={cityRef} placeholder="City" type="text" />
      <input ref={streetRef} placeholder="Street number" type="text" />
      <input ref={addressRef} placeholder="Address" type="text" />
      <input ref={statusRef} placeholder="Status" type="text" />
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateAlert;
