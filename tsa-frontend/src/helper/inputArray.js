export const inputArray  = (setSymptomList, newData, symptomList, zeroArray,freqArray,data) => {
    setSymptomList([...symptomList, newData[0]]);
    zeroArray.splice(parseInt(newData[1]), 1, 1);
    while (true) {
      console.log('stuck')
      if (data[parseInt(newData[1])]) {
        freqArray.splice(
          parseInt(newData[1]),
          1,
          data[parseInt(newData[1])].freq
        );
        break;
      }
    }
}