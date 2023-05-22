import React, { useState } from "react";

const parameters = [
  {
    _id: 1,
    name: "acidity",
    unit: "pH",
    ranges: [
      {
        message: "Too hight",
        min: 0,
        max: 7,
      },
      {
        message: "OK",
        min: 7,
        max: 7,
      },
      {
        message: "Too low",
        min: 7,
        max: 14,
      },
    ],
  },
]; // TODO: make get request to receive all Parameters

const ParameterTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowExpand = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const handleAddRange = (rowId) => {
    // Implement your logic to add a new range to the parameter
    console.log(`Add range to Parameter ${rowId}`);
  };

  const handleUpdateRange = (rowId, rangeId) => {
    // Implement your logic to update the range
    console.log(`Update range ${rangeId} of Parameter ${rowId}`);
  };

  const handleDeleteRange = (rowId, rangeId) => {
    // Implement your logic to delete the range
    console.log(`Delete range ${rangeId} of Parameter ${rowId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Ranges</th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((parameter) => (
          <React.Fragment key={parameter._id}>
            <tr>
              <td>{parameter.name}</td>
              <td>{parameter.unit}</td>
              <td>
                <button onClick={() => handleRowExpand(parameter._id)}>
                  Expand
                </button>
              </td>
            </tr>
            {expandedRows.includes(parameter._id) && (
              <tr>
                <td colSpan={3}>
                  <table>
                    <thead>
                      <tr>
                        <th>Message</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parameter.ranges.map((range, index) => (
                        <tr key={index}>
                          <td>{range.message}</td>
                          <td>{range.min}</td>
                          <td>{range.max}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleUpdateRange(parameter._id, range._id)
                              }
                            >
                              Update
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteRange(parameter._id, range._id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <input type="text" name="message" />
                        </td>
                        <td>
                          <input type="number" name="min" />
                        </td>
                        <td>
                          <input type="number" name="max" />
                        </td>
                        <td>
                          <button onClick={() => handleAddRange(parameter._id)}>
                            Add Range
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ParameterTable;
