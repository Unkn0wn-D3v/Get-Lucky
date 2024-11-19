//Constants
const spinButton = document.getElementById("spin");
const displayOne = document.getElementById("1");
const displayTwo = document.getElementById("2");
const displayThree = document.getElementById("3");
const betInput = document.getElementById("bet");
const balanceText = document.getElementById("kimbucks");
const clearButton = document.getElementById("clearData");
const maxBalanceText = document.getElementById("max-balance");
const soulButton = document.getElementById("sellSoul");
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

const boostedOdds = [
  "6",
  "6",
  "6",
  "6",
  "6",
  "6",
  "6",
  "6",
  "G",
  "G",
  "G",
  "G",
  "G",
];

//Variables
var spinResult1;
var spinResult2;
var spinResult3;
var balance = localStorage.getItem("balance") ?? 100;
var isSpinning = false;
var highestBalance = localStorage.getItem("highestBalance") ?? 100;
var soulSold = localStorage.getItem("soulSold") ?? false;

if (soulSold == "true") {
  soulSold = true;
} else if (soulSold == "false") {
  soulSold = false;
}

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

soulButton.addEventListener("click", async () => {
  if (!soulSold) {
    window.alert(
      "???: Hello there, young gambler. Have you finally returned to sell your soul once again?"
    );
    window.alert(
      "???: Oh that's right, you don't remember, let's start with the basics."
    );
    window.alert(
      "???: If you sell your soul, you will get boosted odds, and have very high chances to roll a G in each slot..."
    );
    window.alert("???: ...but there could be...");
    window.alert('???: ...let\'s leave it at "unforseen consequences".');
    window.alert(
      "???: If you sell your soul to me, there's no going back, but the rewards are greater than can be imagined!"
    );
    window.alert("???: What do you say? Old friend...");
    let boolean = window.confirm("Sell your soul?");

    if (boolean) {
      soulSold = true;
      window.alert("???: Good choice.");
      window.alert("???: You know what they say...");
      window.alert("???: ...99% of gamblers quit right before their big win!");
    } else {
      window.alert("???: That's too bad, but I know you'll come back...");
      window.alert("???: Good luck, young gambler...");
    }
  } else {
    window.alert("The mysterious figure doesn't respond.");
    window.alert("It seems that you can't sell your soul more than once...");
  }
});

spinButton.addEventListener("click", async () => {
  spin_functionality: if (!isSpinning) {
    var bet = Math.floor(Number(betInput.value));
    betInput.value = bet;

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

    if (!soulSold) {
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
      if (displayOne.textContent != "G") {
        spinResult1 = Number(displayOne.textContent);
      } else spinResult1 = displayOne.textContent;

      await sleep(1000);

      clearInterval(interval2);
      if (displayTwo.textContent != "G") {
        spinResult2 = Number(displayTwo.textContent);
      } else spinResult2 = displayTwo.textContent;

      await sleep(1000);

      clearInterval(interval3);
      if (displayThree.textContent != "G") {
        spinResult3 = Number(displayThree.textContent);
      } else spinResult3 = displayThree.textContent;

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
          if (
            spinResult1 + 1 == spinResult2 &&
            spinResult2 + 1 == spinResult3
          ) {
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
    } else {
      let interval1 = setInterval(() => {
        let randomNumber = getRandomInt(boostedOdds.length);
        let result = boostedOdds[randomNumber];
        displayOne.textContent = result;
      }, 1000 / 60);

      let interval2 = setInterval(() => {
        let randomNumber = getRandomInt(boostedOdds.length);
        let result = boostedOdds[randomNumber];
        displayTwo.textContent = result;
      }, 1000 / 60);

      let interval3 = setInterval(() => {
        let randomNumber = getRandomInt(boostedOdds.length);
        let result = boostedOdds[randomNumber];
        displayThree.textContent = result;
      }, 1000 / 60);

      await sleep(2000);

      clearInterval(interval1);
      if (displayOne.textContent != "G") {
        spinResult1 = Number(displayOne.textContent);
      } else spinResult1 = displayOne.textContent;

      await sleep(1000);

      clearInterval(interval2);
      if (displayTwo.textContent != "G") {
        spinResult2 = Number(displayTwo.textContent);
      } else spinResult2 = displayTwo.textContent;

      await sleep(1000);

      clearInterval(interval3);
      if (displayThree.textContent != "G") {
        spinResult3 = Number(displayThree.textContent);
      } else spinResult3 = displayThree.textContent;

      await sleep(20);

      var reward;

      const rolledGs = countG();

      switch (rolledGs) {
        case 1:
          reward = bet * 2;
          break;
        case 2:
          reward = bet * 4;
          break;
        case 3:
          reward = bet * 8;
          break;
        default:
          reward = balance * -1;
          alert("???: Oh, thats too bad..");
          alert("???: Looks like you lost");
          alert("???: Oh well, it is what it is");
          alert(
            "???: I can't have you running around telling people about me though..."
          );
          alert("???: Any last words?");
          prompt("Say your famous last words:");
          alert(
            "???: *sigh* I honestly feel bad. You know what? I'll let you get off with your data being cleared."
          );
          alert("???: You're lucky I'm nice...");
          soulSold = false;
          clearAllData();
          alert("The voice fades away as you realize your data has been reset");
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
  localStorage.setItem("soulSold", soulSold);
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
  localStorage.setItem("soulSold", soulSold);
  setBalanceText();

  if (soulSold) {
    alert(
      "It seems that your soul is still gone, clearing your data appears to do nothing about that"
    );
  }
}

function countG() {
  var numberGs = 0;
  if (spinResult1 == "G") numberGs += 1;
  if (spinResult2 == "G") numberGs += 1;
  if (spinResult3 == "G") numberGs += 1;

  return numberGs;
}
