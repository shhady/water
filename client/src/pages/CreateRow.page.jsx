import TriggerForm from "../components/TriggerForm";
import IdentifierForm from "../components/IdentifierForm";
import ConfigConditionForm from "../components/ConfigConditionForm";

const CreateRow = () => {
  const formType = localStorage.getItem("form-type");

  return (
    <div className="CreateRow">
      {formType === "Trigger" && <TriggerForm />}
      {formType == "Identifier" && <IdentifierForm />}
      {formType == "ConfigConditions" && <ConfigConditionForm />}
    </div>
  );
};

export default CreateRow;
