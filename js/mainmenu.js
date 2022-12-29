let all = document.getElementsByClassName("grid-btn");
let otherBtn = document.getElementById("otherBtn");
let buttons = Array.from(all);
let zeroBal = JSON.parse('{ "Balance": "0" }');
let myUrl;
let myUrl2;
let jsonbalance;
let buttonVal;
let objectBalance;
let arrayAlter = [];
let recObj;
let recordArray;
let accountInf = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();
  jsonbalance = data[0].Balance;
  myUrl2 = `http://localhost:3000/members/${data[0].id}`;
  myUrl = `http://localhost:3000/loggedin/${data[0].id}`;
  recordArray = data[0].records;
};
document.addEventListener("DOMContentLoaded", accountInf());

buttons.map((button) => {

  button.addEventListener("click",  () => {
    
    buttonVal = button.textContent;
    if (jsonbalance == zeroBal.Balance) {
      alert("Insufficient Funds");
      return;
    } else {
      var newBal = jsonbalance - buttonVal;
      if (Math.sign(newBal) === -1) {
        alert("Insufficient Funds");
        return;
      }
      objectBalance = {
        Balance: `${newBal}`,
      };
      
    }
    updateDb()
  });
});


let updateDb = async () => {
  await fetch(myUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectBalance),
  });

  await fetch(myUrl2, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectBalance),
  });
 // await recordWdraw()
};

otherBtn.addEventListener("click", () => {
  window.location.href = "wdraw.html";
});
/*
let recordWdraw = async () => {
  arrayAlter = recordArray;
  arrayAlter.push({
    date: new Date(),
    balance: jsonbalance,
  });

  recObj = {
    records: arrayAlter,
  };

  await fetch(myUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recObj),
  });
  
};
*/


