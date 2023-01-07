let submitEl = document.getElementById("submitButton");
let cancelBtn = document.getElementById("cancelBtn");
let clearBtn = document.getElementById("clearBtn");
let wdrawInp = document.getElementById("inp1");
let notifyName = document.getElementById("notify");
let withdrawAmount;
let url1;
let url2;
let obj;
let userBalance;
submitEl.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const json = await res.json();

  if (wdrawInp.value == "") {
    notifyName.innerHTML = "Enter Withdraw Amount";
    openPopup();

    return;
  } else {
    if (Math.sign(wdrawInp.value) === -1) {
      notifyName.innerHTML = "Do not put invalid values";
      openPopup();

      return;
    }

    userBalance = json[0].balance;
    withdrawAmount = document.getElementById("inp1").value;
    let zeroBal = JSON.parse('{ "Balance": "0" }');

    if (json[0].Balance == zeroBal.Balance) {
      notifyName.innerHTML = "Insufficient Funds";
      openPopup();
      return;
    } else {
      var newBal = json[0].Balance - withdrawAmount;
      if (Math.sign(newBal) === -1) {
        notifyName.innerHTML = "Insufficient Funds";
        openPopup();
        return;
      }

      obj = {
        Balance: `${newBal}`,
      };

      url1 = `http://localhost:3000/loggedin/${json[0].id}`;
      url2 = `http://localhost:3000/members/${json[0].id}`;

      await updateDB();
    }
  }
});

let updateDB = async () => {
  await fetch(url1, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  await fetch(url2, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
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
    record_amount: withdrawAmount,
    record_balance: json[0].Balance,
    recordId: json[0].id,
  };

  fetch("http://localhost:3000/records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recordObj),
  });
};

cancelBtn.addEventListener("click", () => {
  window.location.href = "mainmenu.html";
});

clearBtn.addEventListener("click", () => {
  wdrawInp.value = "";
});

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
