import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TriggerForm from "../components/TriggerForm";

const CreateRow = () => {
  const formType = localStorage.getItem("form-type");

  return (
    <div className="CreateRow">{formType === "Trigger" && <TriggerForm />}</div>
  );
};

export default CreateRow;
