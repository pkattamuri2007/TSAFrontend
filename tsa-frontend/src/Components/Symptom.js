import React from "react";
import Chip from "@mui/material/Chip";
import symData from "../data/data.json";
export default function Symptom({ data, id, handleSymptomDelete }) {
  const handleSymptom = () => {
    handleSymptomDelete([data[1], data[0]]);
  };

  var tempData = data[0] + data[1];
  console.log(tempData);
  console.log(data);
  tempData = tempData.replace(/[0-9]/g, "");
  tempData = tempData.replace(/undefined/g, "");
  const regex = /,/g;
  tempData = tempData.replace(regex, "");
  return (
    <div key={id}>
      <Chip label={tempData} variant="outlined" onDelete={handleSymptom} />
    </div>
  );
}
