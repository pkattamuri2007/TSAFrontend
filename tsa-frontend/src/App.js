import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/Searchbar";
import data from "./data.json";
import diseaseData from "./data2.json";
const zeroArray = new Array(406).fill(0);
function App() {
  const [symptomList, setSymptomList] = useState([]);
  const [finalDiseases, setFinalDiseases] = useState([]);
  var diseaseNames = [];
  const onSubmitHandler = (newData) => {
    var bestArray = [];
    var bestMatch
    var bestMatches = [0,0,0,0,0,0,0,0,0,0];
 
    for (let i = 0; i < diseaseData.length; i++) {
      for (let j = 0; j < diseaseData[i].symptoms.length; j++) {
        if (zeroArray[j] == diseaseData[i].symptoms[j] && zeroArray[j] == 1) {
          bestMatch++;
        }
      }
      if (bestMatch > bestMatches[9]) {
        console.log(bestMatch);
        bestArray = diseaseData[i].symptoms;
        diseaseNames.unshift([diseaseData[i].disease, bestMatch]);
        bestMatches.unshift(bestMatch);
      }

      bestMatch = 0;
    }

    setFinalDiseases(diseaseNames);
    console.log(diseaseNames, bestMatch);
  };
  const dataSubmitHandler = (newData) => {
    setSymptomList([...symptomList, newData[0]]);
    console.log(symptomList);
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    console.log(zeroArray);
  };
  console.log(finalDiseases);
  finalDiseases.sort(function(a, b){return b[1] - a[1]})
  console.log(finalDiseases);
  return (
    <div className="App">
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
      <button className="button-9" role="button" onClick={onSubmitHandler}>
        Submit
      </button>
      <p>
        Predicted Disease:{" "}
        {finalDiseases.slice(0,10).map((data, id) => {
          return (
            <div key={id}>
              <h2>{data[0]} {data[1]} </h2>
            </div>
          );
        })}
      </p>
    </div>
  );
}

export default App;
