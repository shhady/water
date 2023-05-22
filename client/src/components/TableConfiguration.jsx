import TriggerTable from "./TriggerTable";
import IdentifierTable from "./IdentifierTable";
import ConfigConditionTable from "./ConfigConditionTable";
import ConnectionsTable from "./ConnectionsTable";
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
      <ConnectionsTable />
      <hr />
      <ParameterTable />
    </div>
  );
}

export { TableConfiguration };
