import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/Searchbar";
import data from "./data.json";
import diseaseData from "./data2.json";
import { config } from "dotenv";
import OpenAI from "openai";

config();
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, // This is also the default, can be omitted
});
const zeroArray = new Array(406).fill(0);
function App() {
  const [symptomList, setSymptomList] = useState([]);
  const [finalDiseases, setFinalDiseases] = useState([]);
  const [whenSubmit, setWhenSubmit] = useState(true);
  var diseaseNames = [];
  useEffect(() => {
    if(finalDiseases.length > 0) {
    console.log(finalDiseases);
    var chatInput =
    "Write a 2 sentence summary about the following disease:" +
    finalDiseases[0][0].toString();
  console.log(chatInput);
  openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: chatInput }],
    })
    .then((response) => {
      console.log(response.choices[0].message.content)
      var tempFinal = finalDiseases;
      tempFinal[0][2] = response.choices[0].message.content;
      console.log(tempFinal);
      setFinalDiseases(tempFinal.slice(0,5));
    });
    }
  }, [whenSubmit]);
  
  const onSubmitHandler = (newData) => {
    var bestMatch = 0;
    var bestMatches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < diseaseData.length; i++) {
      for (let j = 0; j < diseaseData[i].symptoms.length; j++) {
        if (zeroArray[j] === diseaseData[i].symptoms[j] && zeroArray[j] === 1) {
          bestMatch++;
        }
      }
      if (bestMatch > bestMatches[4]) {
        console.log(bestMatch);

        diseaseNames.unshift([diseaseData[i].disease, bestMatch]);
        bestMatches.unshift(bestMatch);
      }

      bestMatch = 0;
    }
    setFinalDiseases(diseaseNames);
    setWhenSubmit(!whenSubmit);

  };
  const dataSubmitHandler = (newData) => {
    setSymptomList([...symptomList, newData[0]]);
    console.log(symptomList);
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    console.log(zeroArray);
  };
  console.log(finalDiseases);
  finalDiseases.sort(function (a, b) {
    return b[1] - a[1];
  });
  console.log(finalDiseases);

  return (
    <div className="App">
      <h1>{process.env.REACT_APP_SECRET_CODE}</h1>
      <SearchBar
        placeholder="Enter Your Symptom..."
        data={data}
        onDataSubmit={dataSubmitHandler}
      />
      <div className="App-header">Selected Symptom</div>
      {console.log(symptomList)}
      {symptomList.map((data, id) => {
        return (
          <div key={id}>
            <h2>{data} </h2>
          </div>
        );
      })}
      <button className="button-9" onClick={onSubmitHandler}>
        Submit
      </button>
      <div>
        Predicted Disease:{" "}
        {finalDiseases.slice(0, 5).map((data, id) => {
          return (
            <div key={id}>
              
               <p>{data[0]} {data[1]} {data[2]}</p>
                {console.log(data)}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
