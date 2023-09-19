export const inputArray = (
  setSymptomList,
  newData,
  symptomList,
  zeroArray,
  freqArray,
  data
) => {
  if (newData[1] !== undefined) {
    setSymptomList([...symptomList, [newData[0], newData[1]]]);
    zeroArray.splice(parseInt(newData[1]), 1, 1);

    freqArray.splice(parseInt(newData[1]), 1, data[parseInt(newData[1])].freq);
  }
};
