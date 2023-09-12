
export const bestMatchAlgo = (diseaseData, zeroArray, data, diseaseNames, setFinalDiseases, setWhenSubmit, whenSubmit) =>{
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
  }