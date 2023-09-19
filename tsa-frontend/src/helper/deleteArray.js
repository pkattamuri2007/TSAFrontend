export const deleteArray = (
  setSymptomList,
  symptomList,
  deleteData,
  zeroArray
) => {
  const tempList = symptomList.slice();
  console.log(symptomList);
  console.log(deleteData);
  for (let i = 0; i < tempList.length; i++) {
    console.log(tempList[i][0]);
    console.log(deleteData[1]);
    if (deleteData[1] === tempList[i][0]) {
      tempList.splice(i, 1);
      console.log(i);
    }
  }
  zeroArray.splice(parseInt(deleteData[0]), 1, 0);
  console.log(zeroArray);
  setSymptomList(tempList);
};
