import TriggerForm from "../components/TriggerForm";

const CreateRow = () => {
  const formType = localStorage.getItem("form-type");

  return (
    <div className="CreateRow">{formType === "Trigger" && <TriggerForm />}</div>
  );
};

export default CreateRow;
