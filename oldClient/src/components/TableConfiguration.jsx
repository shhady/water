import TriggerTable from "./TriggerTable";
import SensorsTable from "./SensorsTable";
import WaterInfrastructureTable from "./WaterInfrastructureTable";
import TriggerTypeTable from "./TriggerTypeTable";

const TableConfiguration = () => {
  console.log("Hello from TableConfiguration");
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
};

export default TableConfiguration;
