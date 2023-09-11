export const percentCalculator = (diseaseArray, selectedSymptoms) => {
   var percentProbablity = [];
    for (var i = 0; i < diseaseArray.length; i++){
        var O = diseaseArray[i][1]/selectedSymptoms.length;
        O = 50 * (O ** 2.5);
        var counter = 0;
        for (var j = 0; j < diseaseArray[i][3].length; j++){
            console.log(diseaseArray[i][3][j]-4.7, 'difference');
            counter += diseaseArray[i][3][j] - 4.7;
    }
    var C = 0
    counter = counter / (diseaseArray[i][3].length);
    console.log(counter, 'mad');
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
var combinedTotal = Math.round(100*(O + C))/100;
selectedSymptoms.length == 1 ? combinedTotal *= 0.5 : combinedTotal = combinedTotal 
selectedSymptoms.length == 2 ? combinedTotal *= 0.75 : combinedTotal = combinedTotal;
percentProbablity.push(combinedTotal);
}
return percentProbablity;
}