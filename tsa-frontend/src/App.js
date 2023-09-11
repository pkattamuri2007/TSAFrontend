import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/Searchbar";
import data from "./data.json";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
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
  var tempDesc = []
  //CHAT GPT CALL
  useEffect(() => {
    console.log("hello");
    setIsLoading(true);
    console.log(finalDiseases.length > 0);
    if (finalDiseases.length > 0) {
      const asyncLoop = async () => {
        for (let i = 0; i < finalDiseases.length; i++) {
          console.log("next");
          var chatInput =
            "Write a two sentence summary about the disease " + finalDiseases[i][0];
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: chatInput }],
          });

          console.log(response.choices[0].message.content);
          tempDesc.push(response.choices[0].message.content);
          
        }
        setDescription(tempDesc);
        setIsLoading(false);
      };
      console.log('hi');

      asyncLoop();
      console.log('hello')
      
    }
  }, [whenSubmit]);
  useEffect(() => {
    console.log(description);
  },[description]);

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
    setFinalDiseases(diseaseNames.slice(0, 5));
    setWhenSubmit(!whenSubmit);
  };
  const dataSubmitHandler = (newData) => {
    setSymptomList([...symptomList, newData[0]]);
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    while (true) {
      if (data[parseInt(newData[1])]) {
        freqArray.splice(
          parseInt(newData[1]),
          1,
          data[parseInt(newData[1])].freq
        );
        break;
      }
    }
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

      {symptomList.length < 3 ? (
        <Alert sx={{ my: 2 }} severity="warning">
          Enter more symptoms for an accurate result
        </Alert>
      ) : null}
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
        {finalDiseases.map((data, id) => {
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
                <Typography sx={{ my: 1.5 }} color="text.secondary">
                  # of Matching Symptoms: {data[1]}
                </Typography>
                <Typography variant="body2">{!isLoading ? description[id]: <CircularProgress/>}</Typography>
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
