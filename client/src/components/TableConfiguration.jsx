import TriggerTable from "./TriggerTable";
import IdentifierTable from "./IdentifierTable";
import ConfigConditionTable from "./ConfigConditionTable";
import ConnectionsForm from "./ConnectionsForm";
import ParameterTable from "./ParameterTable";

function TableConfiguration() {
  return (
    <div>
      <TriggerTable />
      <hr />
      <IdentifierTable />
      <hr />
      <ConfigConditionTable />
      <hr />
      <ConnectionsForm />
      <hr />
      <ParameterTable />
    </div>
  );
}

export { TableConfiguration };
