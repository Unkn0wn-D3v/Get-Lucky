//Constants
const spinButton = document.getElementById("spin");
const displayOne = document.getElementById("1");
const displayTwo = document.getElementById("2");
const displayThree = document.getElementById("3");
const betInput = document.getElementById("bet");
const balanceText = document.getElementById("kimbucks");
const clearButton = document.getElementById("clearData");
const slotOptions = [
  "1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "G",
];

//Variables
var spinResult;
var balance = localStorage.getItem("balance") ?? 100;
var isSpinning = false;

//Setting defaults
setBalanceText();

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
    spinResult = displayOne.textContent;

    await sleep(1000);

    clearInterval(interval2);
    spinResult = spinResult + displayTwo.textContent;

    await sleep(1000);

    clearInterval(interval3);
    spinResult = spinResult + displayThree.textContent;

    await sleep(20);

    isSpinning = false;

    var reward;
    var lost;

    switch (spinResult) {
      case "111":
        lost = false;
        reward = bet * 10;
        window.alert("WOW! 10x");
        break;
      case "222":
        lost = false;
        reward = bet * 2;
        window.alert("Wow, 2x!");
        break;
      case "333":
        lost = false;
        reward = bet * 3;
        window.alert("Wow, 3x!");
        break;
      case "444":
        lost = false;
        reward = bet * 4;
        window.alert("Wow, 4x!");
        break;
      case "555":
        lost = false;
        reward = bet * 5;
        window.alert("Wow, 5x!");
        break;
      case "666":
        lost = false;
        reward = bet * 6;
        window.alert("Wow, 6x!");
        break;
      case "777":
        lost = false;
        reward = bet * 7;
        window.alert("Wow, 7x!");
        break;
      case "888":
        lost = false;
        reward = bet * 8;
        window.alert("Wow! 8x!");
        break;
      case "999":
        lost = false;
        reward = bet * 9;
        window.alert("WOW, 9x!");
        break;
      case "GGG":
        lost = false;
        reward = bet * 20;
        window.alert("WOW OMG JACKPOT, 20x!");
        break;
      default:
        lost = true;
        reward = bet / 2;
        window.alert("You lost half your bet :(");
    }

    reward = Math.floor(reward);

    balance += reward;
    setBalanceText();

    if (balance < 1) {
      window.alert(
        "Your balance has been reduced to an unbettable amount, your data has now been reset."
      );

      clearAllData();
    }
  }
});

//On Unload
window.addEventListener("beforeunload", () => {
  localStorage.setItem("balance", balance);
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

function clearAllData() {
  localStorage.clear();
  balance = 100;
  setBalanceText();
}
