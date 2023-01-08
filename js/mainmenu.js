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
let popup = document.getElementById("popup");
let notifyName = document.getElementById("notify");
let confirmBtn = document.getElementById("updateBtn");
let closeBtn = document.getElementById("btn_holder");
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
  button.addEventListener("click", () => {
    buttonVal = button.textContent;
    if (jsonbalance == zeroBal.Balance) {
      closeBtn.innerHTML = "";
      confirmBtn.textContent = "OK";
      confirmBtn.setAttribute("onclick", "closePopup()");
      notifyName.innerHTML = "Insufficient Funds";
      openPopup();

      return;
    } else {
      var newBal = jsonbalance - buttonVal;
      if (Math.sign(newBal) === -1) {
        closeBtn.innerHTML = "";
        confirmBtn.textContent = "OK";
        confirmBtn.setAttribute("onclick", "closePopup()");
        notifyName.innerHTML = "Insufficient Funds";
        openPopup();
        return;
      }
      objectBalance = {
        Balance: `${newBal}`,
      };

      closeBtn.innerHTML = "<button onclick = 'closePopup()'>No</button>";
      confirmBtn.textContent = "Yes";
      notifyName.innerHTML =
        "Are you sure you want to proceed with the transaction?";
      openPopup();
      confirmBtn.setAttribute("onclick", "updateDb()");
    }
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
  await postRecords();
};

let postRecords = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const json = await res.json();

  let recordObj = {
    record_type: "Withdraw",
    record_date: `${
      new Date().getMonth() + 1
    } / ${new Date().getDate()}/ ${new Date().getFullYear()}`,
    record_time: `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
    record_amount: buttonVal,
    record_balance: json[0].Balance,
    recordId: json[0].id,
  };

  fetch("http://localhost:3000/records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recordObj),
  });
};

otherBtn.addEventListener("click", () => {
  window.location.href = "wdraw.html";
});

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
