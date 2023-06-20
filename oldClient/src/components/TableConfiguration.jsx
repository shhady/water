import TriggerTable from "./TriggerTable";
import SensorsTable from "./SensorsTable";
import WaterInfrastructureTable from "./WaterInfrastructureTable";
import TriggerTypeTable from "./TriggerTypeTable";

function TableConfiguration() {
  return (
    <div>
      <TriggerTable />
      <hr />
      {/* <TriggerTypeTable /> */}
      <hr />
      {/* <SensorsTable /> */}
      <hr />
      {/* <WaterInfrastructureTable /> */}
    </div>
  );
}

export { TableConfiguration };
