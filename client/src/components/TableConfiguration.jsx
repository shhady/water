import TriggerTable from "./TriggerTable";
import IdentifierTable from "./IdentifierTable";
import ConfigConditionTable from "./ConfigConditionTable";
import ConnectionsForm from "./ConnectionsForm";
import ParameterTable from "./ParameterTable";
import SensorTable from "./SensorTable";

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
      <hr />
      <SensorTable />
    </div>
  );
}

export { TableConfiguration };
