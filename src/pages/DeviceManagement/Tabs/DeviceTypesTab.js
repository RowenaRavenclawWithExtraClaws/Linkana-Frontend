import React from "react";
import NoData from "../../../components/Common/NoData";
import { Table } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";

const DeviceTypesTab = (props) => {
  const titles = ["name", "description", "feature_support"];

  const getFeatureSupportData = (type) => {
    let features = [];

    if (type.is_support_remote_commands) features.push("Remote commands");
    if (type.is_support_remote_control) features.push("Remote controls");
    if (type.is_support_apps_install) features.push("App installation");
    if (type.is_support_monitoring) features.push("Monitoring");
    if (type.is_support_ai) features.push("AI");

    return features.join(", ");
  };

  const showTypesInfo = () =>
    props.Types.map((type, key) => (
      <tr key={"_type_" + key}>
        <td>{type.name}</td>
        <td>{type.description}</td>
        <td>{getFeatureSupportData(type)}</td>
      </tr>
    ));

  return props.Types.length ? (
    <div id="devices_table" className="table-responsive">
      <Table className="table table-centered table-nowrap table-striped">
        <TableTitles titles={titles} color=""></TableTitles>
        <tbody>{showTypesInfo(props.Types, titles)}</tbody>
      </Table>
    </div>
  ) : (
    //rendered in the absence of data
    <div id="devices_table">
      <NoData message="No device types are available!"></NoData>
    </div>
  );
};

export default DeviceTypesTab;
