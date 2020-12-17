
const arrMonthsString = ["","janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre"]

export function getMonthLabelFromInt(month){
    return arrMonthsString[month]
}

export function getLabelDay(year, month, day) {
    var date = new Date(`${year}/${month}/${day}`);
    return date.toLocaleDateString("fr-FR", { weekday: 'long' });
  }