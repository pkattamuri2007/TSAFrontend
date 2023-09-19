import SearchBar from "../Components/Searchbar";
import Logo from "../Components/Logo";
import data from "../data/data.json";
import Alert from "@mui/material/Alert";
import Symptom from "../Components/Symptom";
import diseaseData from "../data/data2.json";
import Disease from "../Components/Disease";
import { chatGptCall } from "../helper/chatGptCall";
import * as calc from "../helper/PercentCalculator";
import { bestMatchAlgo } from "../helper/bestMatchAlgo";
import { inputArray } from "../helper/inputArray";
import React, { useState, useEffect } from "react";
import { deleteArray } from "../helper/deleteArray";
import "./Calc.css";
const zeroArray = new Array(406).fill(0);
const freqArray = new Array(406).fill(0);
export default function Calc() {
  const [isLoading, setIsLoading] = useState(false);
  //LISTS ALL SYMPTOMS
  const [symptomList, setSymptomList] = useState([]);
  //LISTS ALL DISEASES
  const [finalDiseases, setFinalDiseases] = useState([]);
  //USED TO TRIGGER USE EFFECT
  const [whenSubmit, setWhenSubmit] = useState(true);
  const [description, setDescription] = useState([]);

  //TEMP VARIABLE
  var diseaseNames = [];

  //CHAT GPT CALL
  useEffect(() => {
    chatGptCall(finalDiseases, setIsLoading, setDescription);
  }, [whenSubmit]);
  useEffect(() => {
    console.log(description);
  }, [description]);

  //WHEN SUBMIT BUTTON IS CLICKED
  const onSubmitHandler = (newData) => {
    bestMatchAlgo(
      diseaseData,
      zeroArray,
      data,
      diseaseNames,
      setFinalDiseases,
      setWhenSubmit,
      whenSubmit
    );
  };
  const dataSubmitHandler = (newData) => {
    inputArray(
      setSymptomList,
      newData,
      symptomList,
      zeroArray,
      freqArray,
      data
    );
  };

  const handleSymptomDelete = (data) => {
    console.log(data);
    deleteArray(setSymptomList, symptomList, data, zeroArray);
  };
  var symptomChance = calc.percentCalculator(finalDiseases, symptomList);
  finalDiseases.sort(function (a, b) {
    return (
      symptomChance[finalDiseases.indexOf(b)] -
      symptomChance[finalDiseases.indexOf(a)]
    );
  });
  return (
    <div className="App">
      <SearchBar
        placeholder="Enter Your Symptoms..."
        data={data}
        key={data}
        onDataSubmit={dataSubmitHandler}
      />
      {symptomList.length < 3 ? (
        <Alert sx={{ my: 2 }} severity="warning">
          Enter more symptoms for an accurate result
        </Alert>
      ) : null}
      <div className="App-header">Selected Symptoms</div>
      {console.log(symptomList)}
      {symptomList.map((data, id) => {
        if (data[0] != undefined) {
          return (
            <Symptom
              key={id}
              data={data}
              id={id}
              handleSymptomDelete={handleSymptomDelete}
            />
          );
        } else {
          return null;
        }
      })}
      <button className="button-9" onClick={onSubmitHandler}>
        Submit
      </button>
      <div>
        {finalDiseases.map((data, id) => {
          return (
            <Disease
              diseaseInfo={data}
              id={id}
              symptomChance={symptomChance}
              isLoading={isLoading}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}
