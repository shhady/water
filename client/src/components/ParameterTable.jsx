import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { baseURL } from "../constants/urlConstants";
import TableLookUps from "../constants/TableLookUps";

const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const ParameterTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [parameters, setParameters] = useState([]);
  const Response = useQuery("Parameters", () =>
    fetchData(baseURL + "/Parameters")
  );
  useEffect(() => {
    if (Response.data) {
      console.log(Response.data);
      setParameters(Response.data);
    }
  }, [Response.data]);

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
          <th>{TableLookUps("NAME")}</th>
          <th>{TableLookUps("UNIT")}</th>
          <th>{TableLookUps("RANGES")}</th>
        </tr>
      </thead>
      <tbody>
        {parameters &&
          parameters.map((parameter) => (
            <React.Fragment key={parameter._id}>
              <tr>
                <td>{parameter.name}</td>
                <td>{parameter.unit}</td>
                <td>
                  <button onClick={() => handleRowExpand(parameter._id)}>
                    {TableLookUps("EXPAND")}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(parameter._id) && (
                <tr>
                  <td colSpan={3}>
                    <table>
                      <thead>
                        <tr>
                          <th>{TableLookUps("MESSAGE")}</th>
                          <th>{TableLookUps("MIN")}</th>
                          <th>{TableLookUps("MAX")}</th>
                          <th>{TableLookUps("ACTIONS")}</th>
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
                                {TableLookUps("UPDATE")}
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteRange(parameter._id, range._id)
                                }
                              >
                                {TableLookUps("DELETE")}
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
                            <button
                              onClick={() => handleAddRange(parameter._id)}
                            >
                              {TableLookUps("ADD_RANGE")}
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
