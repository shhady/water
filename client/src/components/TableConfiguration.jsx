import TriggerTable from "./TriggerTable";
import SensorsTable from "./SensorsTable";
import WaterInfrastructureTable from "./WaterInfrastructureTable";

function TableConfiguration() {
  return (
    <div>
      <TriggerTable />
      <hr />
      <SensorsTable />
      <hr />
      <WaterInfrastructureTable />
    </div>
  );
}

export { TableConfiguration };
