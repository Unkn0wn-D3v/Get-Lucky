//Constants
const spinButton = document.getElementById("spin");
const displayOne = document.getElementById("1");
const displayTwo = document.getElementById("2");
const displayThree = document.getElementById("3");
const betInput = document.getElementById("bet");
const balanceText = document.getElementById("kimbucks");
const clearButton = document.getElementById("clearData");
const maxBalanceText = document.getElementById("max-balance");
const slotOptions = [
  "1",
  "2",
  "3",
  "4",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "1",
  "2",
  "3",
  "4",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "G",
];

//Variables
var spinResult1;
var spinResult2;
var spinResult3;
var balance = localStorage.getItem("balance") ?? 100;
var isSpinning = false;
var highestBalance = localStorage.getItem("highestBalance") ?? 100;

//Setting defaults
setBalanceText();
setMaxBalanceText();

//Button functionality
clearButton.addEventListener("click", () => {
  var confirm = window.confirm("Are you sure you want to clear your data?");

  if (confirm) {
    clearAllData();
    window.alert("Your data has been reset");
  }
});

spinButton.addEventListener("click", async () => {
  spin_functionality: if (!isSpinning) {
    var bet = Number(betInput.value);

    if (bet < 1) {
      window.alert("Please bet at least 1 KB!");
      break spin_functionality;
    }

    if (bet > balance) {
      bet = balance;
      betInput.value = bet;
    }

    balance -= bet;
    setBalanceText();

    isSpinning = true;

    let interval1 = setInterval(() => {
      let randomNumber = getRandomInt(slotOptions.length);
      let result = slotOptions[randomNumber];
      displayOne.textContent = result;
    }, 1000 / 60);

    let interval2 = setInterval(() => {
      let randomNumber = getRandomInt(slotOptions.length);
      let result = slotOptions[randomNumber];
      displayTwo.textContent = result;
    }, 1000 / 60);

    let interval3 = setInterval(() => {
      let randomNumber = getRandomInt(slotOptions.length);
      let result = slotOptions[randomNumber];
      displayThree.textContent = result;
    }, 1000 / 60);

    await sleep(2000);

    clearInterval(interval1);
    if (displayOne.textContent != "G")
      spinResult1 = Number(displayOne.textContent);
    else spinResult1 = "G";

    await sleep(1000);

    clearInterval(interval2);
    if (displayTwo.textContent != "G")
      spinResult2 = Number(displayTwo.textContent);
    else spinResult2 = "G";

    await sleep(1000);

    clearInterval(interval3);
    if (displayThree.textContent != "G")
      spinResult3 = Number(displayThree.textContent);
    else spinResult3 = "G";

    await sleep(20);

    var reward;

    var rolledGs = countG();

    switch (rolledGs) {
      case 1:
        reward = bet * 2;
        break;
      case 2:
        reward = bet * 5;
        break;
      case 3:
        reward = bet * 15;
        break;
      default:
        if (spinResult1 + 1 == spinResult2 && spinResult2 + 1 == spinResult3) {
          reward = bet * 3;
        } else if (spinResult1 == spinResult2 && spinResult2 == spinResult3) {
          reward = bet * 4;
        } else if (
          spinResult1 == spinResult2 ||
          spinResult1 == spinResult3 ||
          spinResult2 == spinResult3
        ) {
          reward = bet * 2;
        } else {
          reward = bet * 0;
        }
    }

    reward = Math.floor(reward);

    balance += reward;
    setBalanceText();

    if (balance > highestBalance) {
      highestBalance = balance;
      setMaxBalanceText();
    }

    if (balance < 1) {
      window.alert(
        "Your balance has been reduced to an unbettable amount, your data has now been reset."
      );

      clearAllData();
    }

    isSpinning = false;
  }
});

//On Unload
window.addEventListener("beforeunload", () => {
  localStorage.setItem("balance", balance);
  localStorage.setItem("highestBalance", highestBalance);
});

//Functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  let number = Math.floor(Math.random() * max);
  return number;
}

function setBalanceText() {
  balanceText.textContent = balance + " KB";
}

function setMaxBalanceText() {
  maxBalanceText.textContent = "Highest Balance: " + highestBalance;
}

function clearAllData() {
  localStorage.clear();
  balance = 100;
  localStorage.setItem("highestBalance", highestBalance);
  setBalanceText();
}

function countG() {
  var numberGs = 0;
  if (spinResult1 == "G") numberGs++;
  if (spinResult2 == "G") numberGs++;
  if (spinResult3 == "G") numberGs++;

  return numberGs;
}
