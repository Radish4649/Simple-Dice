document.getElementById("4").addEventListener("click", completeRoll);
document.getElementById("6").addEventListener("click", completeRoll);
document.getElementById("8").addEventListener("click", completeRoll);
document.getElementById("10").addEventListener("click", completeRoll);
document.getElementById("12").addEventListener("click", completeRoll);
document.getElementById("20").addEventListener("click", completeRoll);
document.getElementById("erase").addEventListener("click", erase);
document.getElementById("rollall").addEventListener("click", rollAll);
document.getElementById("C").addEventListener("click", completeRollCustom);

// PARENT FUNCTIONS

// prepares a normal roll
function completeRoll(die) {
  let dSize = die.currentTarget.id
  let dAmnt = document.getElementById(`n${dSize}`).value;

  if (dAmnt > 99 || dAmnt < 1) {
    return alert("Invalid Dice Amount.\nPlease input a whole number between 1-99");
  };

  return pushRoll(getResults(dSize, dAmnt)[0])
};

// prepares a custom roll
function completeRollCustom() {
  let dSize = document.getElementById("nC2").value;
  let dAmnt = document.getElementById(`nC1`).value;

  if (dAmnt > 99 || dAmnt < 1 || dSize > 99 || dSize < 1) {
    return alert("Invalid Custom Dice Values.\nPlease input a whole number between 1-99");
  };


  return pushRoll(getResults(dSize, dAmnt)[0]);
}

// rolls all available rolls
function rollAll() {
  let valuesArray = [
                    [4, document.getElementById("n4").value],
                    [6, document.getElementById("n6").value],
                    [8, document.getElementById("n8").value],
                    [10, document.getElementById("n10").value],
                    [12, document.getElementById("n12").value],
                    [20, document.getElementById("n20").value],
                    [document.getElementById("nC2").value, document.getElementById("nC1").value]
                    ];
  let filteredArray = valuesArray.filter(x => x[1] !== "");

  if (filteredArray.some(x => x[1] > 99 || x[1] < 1) || (valuesArray[6][0] > 99 || valuesArray[6][0] < 1) && valuesArray[6][1] !== "") {
    return alert("Some values are too high or too low.\nPlease confirm all values are between 1-99")
  }

  let resultsArray = filteredArray.map(x => getResults(x[0], x[1]))
  let formattedArray = resultsArray.map(x=>x[0]).join("\n")

  let totalSum = resultsArray.map(x=>x[1]).reduce((x,y)=>x+y)
  let totalRolled = filteredArray.map(x=>+x[1]).reduce((x,y)=>x+y)
  let totalMean = (totalSum/totalRolled).toFixed(2)

  let a = "~~~~~\n"
  let b = `Rolling All Dice (${totalRolled} dice)...\n`
  let c = `Sum: ${totalSum} | Average: ${totalMean}\n`
  let d = "\nIndividual rolls below: \n-----\n"

  return pushRoll(a+b+c+d+formattedArray+a)
}

// erases everything
function erase() {
  return document.getElementById('text').value = ""
}

// HELPER FUNCTIONS

// Parent function that compiles everything but doesn't push the result yet
function getResults(dSize, dAmnt) {
  let dRoll = roll(dSize, dAmnt);
  return formatRoll(dSize, dAmnt, dRoll);
}

// does the actual roll
function roll(dSize, dAmnt) {
  let dRoll = [];

  for (let i = 0; i < dAmnt; i++) {
    let r = Math.floor(Math.random()*dSize)+1;
    dRoll.push(r);
  };

  return dRoll
}

// formats the roll
function formatRoll(dSize, dAmnt, dRoll) {
  let sum = dRoll.reduce((x,y)=>x+y);
  let mean = (sum/dAmnt).toFixed(2);

  let a = `Rolling ${dAmnt}D${dSize}...\n`;
  let b = `${dRoll}\n`;
  let c = `Sum: ${sum} | Average: ${mean}\n`;
  let d = `-----\n`;

  return [a+b+c+d, sum];
}

//pushes the roll to the text area
function pushRoll(roll) {
  return document.getElementById('text').value = roll + document.getElementById('text').value;
}
