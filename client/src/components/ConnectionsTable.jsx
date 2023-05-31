import React, { useState } from "react";
import translate from "../services/translate";

const ConnectionTable = ({ connections }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const language = localStorage.getItem("language");

  const handleExpandRow = (connectionId) => {
    if (expandedRows.includes(connectionId)) {
      setExpandedRows(expandedRows.filter((id) => id !== connectionId));
    } else {
      setExpandedRows([...expandedRows, connectionId]);
    }
  };

  const handleEditConnection = (connectionId) => {
    // Handle edit connection logic
    console.log("Edit connection:", connectionId);
  };

  const handleDeleteConnection = (connectionId) => {
    // Handle delete connection logic
    console.log("Delete connection:", connectionId);
  };

  const handleEditParameter = (connectionId, parameterIndex) => {
    // Handle edit parameter logic
    console.log("Edit parameter:", connectionId, parameterIndex);
  };

  const handleDeleteParameter = (connectionId, parameterIndex) => {
    // Handle delete parameter logic
    console.log("Delete parameter:", connectionId, parameterIndex);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>{translate(language, "Meaning")} </th>
          <th>{translate(language, "Activity")}</th>
          <th>{translate(language, "Parameters")}</th>
          <th>{translate(language, "Actions")}</th>
        </tr>
      </thead>
      <tbody>
        {connections.map((connection) => (
          <React.Fragment key={connection._id}>
            <tr>
              <td>{connection.meaning}</td>
              <td>{connection.activity}</td>
              <td>
                <button
                  onClick={() => handleExpandRow(connection._id)}
                  style={{ marginBottom: "8px" }}
                >
                  Expand
                </button>
              </td>
              <td>
                <button onClick={() => handleEditConnection(connection._id)}>
                  Edit
                </button>{" "}
                <button onClick={() => handleDeleteConnection(connection._id)}>
                  Delete
                </button>
              </td>
            </tr>
            {expandedRows.includes(connection._id) &&
              connection.parameters.map((parameter, index) => (
                <tr key={index}>
                  <td colSpan={2}></td>
                  <td>
                    {parameter.trigger} - {parameter.type} - {parameter.value}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditParameter(connection._id, index)}
                    >
                      {translate(language, "Edit")}
                    </button>{" "}
                    <button
                      onClick={() =>
                        handleDeleteParameter(connection._id, index)
                      }
                    >
                      {translate(language, "Delete")}
                    </button>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ConnectionTable;
