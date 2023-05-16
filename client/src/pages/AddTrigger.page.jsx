import { React } from "react";
import { FormRow } from "../components";
import useAddTrigger from "../CustomHook/useAddTrigger";
import {
  ADD_TRIGGER_TITLE,
  WAITING_BUTTON,
  SEND_TRIGGER_BUTTON,
  NUMBER_FIELD,
  TRIGGER_FIELD,
  SYSTEM_FIELD,
  MEANING_FIELD,
} from "../constants";
function AddTrigger() {
  const {
    trigger,
    triggerError,
    handleTriggerChange,
    handleTriggerBlur,
    meaning,
    meaningError,
    handleMeaningChange,
    handleMeaningBlur,
    number,
    numberError,
    handleNumberChange,
    handleNumberBlur,
    system,
    systemError,
    handleSystemChange,
    handleSystemBlur,
    handleSubmit,
    isDisabled,
  } = useAddTrigger();

  return (
    <div className="form-add-item card text-center">
      <h2 className="text-center p-b m-1">{ADD_TRIGGER_TITLE}</h2>
      <form onSubmit={handleSubmit}>
        {/* trigger field */}
        <FormRow
          error={triggerError.isError}
          type="number"
          name="trigger"
          id="trigger"
          placeholder={TRIGGER_FIELD}
          value={trigger}
          handleChange={handleTriggerChange}
          handleBlur={handleTriggerBlur}
          message={triggerError.message}
        />

        {/* number field */}
        <FormRow
          error={numberError.isError}
          type="number"
          name="number"
          id="number"
          placeholder={NUMBER_FIELD}
          value={number}
          handleChange={handleNumberChange}
          handleBlur={handleNumberBlur}
          message={numberError.message}
        />

        {/* meaning field */}
        <FormRow
          error={meaningError.isError}
          type="text"
          name="meaning"
          id="meaning"
          maxLength="2"
          placeholder={MEANING_FIELD}
          value={meaning}
          handleChange={handleMeaningChange}
          handleBlur={handleMeaningBlur}
          message={meaningError.message}
        />

        {/* system field */}

        <FormRow
          error={meaningError.isError}
          type="text"
          name="system"
          id="system"
          maxLength="2"
          placeholder={SYSTEM_FIELD}
          value={system}
          handleChange={handleSystemChange}
          handleBlur={handleSystemBlur}
          message={systemError.message}
        />

        {/* <FormRow
              type="text"
              name="system"
              id="system"
              maxLength="4"
              placeholder={SYSTEM_FIELD}
              value={system}
              onChange={handleSystemChange}
              onBlur={handleSystemBlur}
              className={`form-input ${systemError.isError && "error"}`}
            />
            
          </div>
          {systemError.isError && (
            <div>
              <small>{systemError.message}</small>
            </div>
          )} */}

        <button
          className={`btn btn-success m-t-1   ${isDisabled ? "disabled" : ""} `}
          onClick={handleSubmit}
          name="submit"
          type="submit"
          style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
        >
          {isDisabled ? WAITING_BUTTON : SEND_TRIGGER_BUTTON}
        </button>
      </form>
    </div>
  );
}

export default AddTrigger;
