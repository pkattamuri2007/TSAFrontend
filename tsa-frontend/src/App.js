import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/Searchbar";
import data from "./data.json";
import diseaseData from "./data2.json";
const zeroArray = new Array(406).fill(0);
function App() {
  const [symptomList, setSymptomList] = useState([]);
  const [finalDisease, setFinalDisease] = useState('');
  const onSubmitHandler = (newData) => {
  var bestArray = []
  var diseaseName = ''
  var bestMatch = 0
  var prevBestMatch = 0
  for (let i = 0; i < diseaseData.length; i++){
    for (let j = 0; j < diseaseData[i].symptoms.length; j++){
      if(zeroArray[j] == diseaseData[i].symptoms[j] && zeroArray[j] == 1){
        bestMatch++
      }
    }
    if(bestMatch > prevBestMatch){
      console.log(bestMatch)
      prevBestMatch = bestMatch
      bestArray = diseaseData[i].symptoms
      diseaseName = diseaseData[i].disease
    }
  
    bestMatch = 0
  }
 
  setFinalDisease(diseaseName);
  console.log(diseaseName, bestMatch)
  };
  const dataSubmitHandler = (newData) => {
    setSymptomList([...symptomList,newData[0]]);
    console.log(symptomList)
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    console.log(zeroArray)
    

  };

  
  return (
    <div className="App">
      <SearchBar placeholder="Enter Your Symptom..." data={data} onDataSubmit={dataSubmitHandler}/>
      <div className="App-header">Selected Symptom</div>
      {console.log(symptomList)}
      {symptomList.map((data,id)=>{
      return <div key={id}>
        <h2>{data} </h2>
        
      </div>
    })}
    <button className="button-9" role="button" onClick={onSubmitHandler}>Submit</button>
    <h1>Predicted Disease: {finalDisease}</h1>
    </div>
  );
}

export default App;