import numData from '../data/data3.json'
import diseaseData from '../data/data2.json'
export const percentCalculator = (diseaseArray, selectedSymptoms) => {
   var percentProbablity = [];
    for (var i = 0; i < diseaseArray.length; i++){
        var O = diseaseArray[i][1]/selectedSymptoms.length;
        O = O*40;
        var counter = 0;
        for (var j = 0; j < diseaseArray[i][3].length; j++){
           
            counter += diseaseArray[i][3][j] - 4.7;
    }
    var C = 0
    counter = counter / (diseaseArray[i][3].length);

    if ( counter <= 1.07) {
        C = 20
    }
    if (1.07 < counter && counter <= 5.54) {
        C = 18
    }
    if (5.54 < counter && counter <= 10.01) {
        C = 16
    }
    if (10.01 < counter && counter <= 14.48) {
        C = 14
    }
    if (14.48 < counter && counter <= 18.95) {
        C = 12
    }
    if (18.95 < counter && counter <= 23.42) {
        C = 10
    }
    if (23.42 < counter && counter <= 27.89) {
        C = 8
    }
    if (27.89 < counter && counter <= 32.36) {
        C = 6
    }
    if (32.36 < counter && counter <= 26.83) {
        C = 4
    }
    if (36.83 < counter) {
        C = 2
    }
var R = 0;
var diseaseIndex = 0;
for(j = 0; j < diseaseData.length; j++){
    console.log(diseaseData[j].disease, diseaseArray[i][0])
    if (diseaseData[j].disease === diseaseArray[i][0]) {
        diseaseIndex = j;
        break;
    }
}
console.log(diseaseIndex)
var counter1 = numData[diseaseIndex].numCases;
console.log(diseaseArray[i], counter1);
    if (counter1 <= 0.02) {
        R=0
        }
        else if(counter1 > 0.02 && counter1<=0.09){
        R = 4
        }
        else if(counter1 > 0.09 && counter1<=0.097){
        R = 8
        }
        else if(counter1 > 0.097 && counter1<=0.17){
        R = 12
        }
        else if(counter1 > 0.17 && counter1<=0.25){
        R = 16
        }
        else if(counter1 > 0.25 && counter1<=0.7){
        R = 20
        }
        else if(counter1 > 0.7 && counter1<=1.05){
        R = 24
        }
        else if(counter1 > 1.05 && counter1<=1.8){
        R = 28
        }
        else if(counter1 > 1.8 && counter1<=2.95){
        R = 32
        }
        else if(counter1 > 2.95 && counter1<=3.5){
        R = 36
        }
        else if(counter1 > 3.5){
        R = 40
        }

var combinedTotal = Math.round(100*(O + C+ R))/100;
console.log(diseaseArray[i]);
console.log(O,C,R);
if (selectedSymptoms.length === 1) {combinedTotal *= 0.5}
if (selectedSymptoms.length === 2) {combinedTotal *= 0.75}

percentProbablity.push(combinedTotal);
}
return percentProbablity;
}