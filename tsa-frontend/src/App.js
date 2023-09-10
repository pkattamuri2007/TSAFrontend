import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/Searchbar";
import data from "./data.json";
import diseaseData from "./data2.json";
import { config } from "dotenv";
import OpenAI from "openai";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as calc from "./Components/PercentCalculator";
// OPEN AI CONFIGURATION
config();
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, // This is also the default, can be omitted
});
//DEFINING USER INPUTTED ARRAY
const zeroArray = new Array(406).fill(0);
const freqArray = new Array(406).fill(0);

function App() {
  //LISTS ALL SYMPTOMS
  const [symptomList, setSymptomList] = useState([]);
  //LISTS ALL DISEASES
  const [finalDiseases, setFinalDiseases] = useState([]);
  //USED TO TRIGGER USE EFFECT
  const [whenSubmit, setWhenSubmit] = useState(true);

  //TEMP VARIABLE
  var diseaseNames = [];
  //CHAT GPT CALL
  useEffect(() => {
    if (finalDiseases.length > 0) {
      console.log(finalDiseases);

      var chatInput =
        "Write a two sentence description for each of the following diseases.Include a exclamation mark as a divider between each description. " 
for (let i = 0; i < finalDiseases.length; i++) {
  var tempStr = finalDiseases[i][0].replace(/\s/g, '');
  chatInput +=  tempStr + ". "  
}
      
      console.log(chatInput);
      openai.chat.completions
        .create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: chatInput }],
        })
        .then((response) => {
          console.log(response.choices[0].message.content);
          var tempFinal = finalDiseases;
          var responses = response.choices[0].message.content.split("!");
          console.log(tempFinal);
          console.log(finalDiseases);
          console.log(responses)
         
          for (let i = 0; i<finalDiseases.length; i++) {
            tempFinal[i][2] = responses[i];
          }
         
          console.log(tempFinal);
          setFinalDiseases(tempFinal.slice(0, 5));
        });
    }
  }, [whenSubmit]);
  //WHEN SUBMIT BUTTON IS CLICKED
  const onSubmitHandler = (newData) => {
    var bestMatch = 0;
    var bestMatches = [0, 0, 0, 0, 0];
    var symptomFreq = [];
    for (let i = 0; i < diseaseData.length; i++) {
      for (let j = 0; j < diseaseData[i].symptoms.length; j++) {
        if (zeroArray[j] === diseaseData[i].symptoms[j] && zeroArray[j] === 1) {
          bestMatch++;
          symptomFreq.push(data[j].freq);
        }
      }
      if (bestMatch > bestMatches[4]) {
        console.log(bestMatch);

        diseaseNames.unshift([
          diseaseData[i].disease,
          bestMatch,
          "",
          symptomFreq,
        ]);
        bestMatches.unshift(bestMatch);
      }
      bestMatch = 0;
      symptomFreq = [];
    }
    setFinalDiseases(diseaseNames);
    setWhenSubmit(!whenSubmit);
  };
  const dataSubmitHandler = (newData) => {
    setSymptomList([...symptomList, newData[0]]);
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    console.log(data[0]);
    console.log(parseInt(newData[1]));
    freqArray.splice(parseInt(newData[1]), 1, data[parseInt(newData[1])].freq);
  };

  finalDiseases.sort(function (a, b) {
    return b[1] - a[1];
  });

  var symptomChance = calc.percentCalculator(finalDiseases, symptomList);
  return (
    <div className="App">
      <SearchBar
        placeholder="Enter Your Symptoms..."
        data={data}
        onDataSubmit={dataSubmitHandler}
      />
      <div className="App-header">Selected Symptoms</div>

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
        {finalDiseases.slice(0, 5).map((data, id) => {
          return (
            <Card key={id} sx={{ minWidth: 400, maxWidth: 400, mt: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Predicted Disease:
                </Typography>
                <Typography variant="h5" component="div">
                  {data[0]}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  # of Matching Symptoms: {data[1]}
                </Typography>
                <Typography variant="body2">{data[2]}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{symptomChance[id]}%</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
