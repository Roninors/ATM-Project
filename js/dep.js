let cancelBtn = document.getElementById("cancelBtn");
let clearBtn = document.getElementById("clearBtn");
let depInp = document.getElementById("inp1");
let notifyName = document.getElementById("notify");
let depAmount;
let depBal;
let url1;
let url2;
let obj;
let confirmBtn = document.getElementById("updateBtn");
let closeBtn = document.getElementById("btn_holder");


let depFunc = async () => {
  if (depInp.value == "") {
    closeBtn.innerHTML = "";
    confirmBtn.textContent = "OK";
    confirmBtn.setAttribute("onclick", "closePopup()");
    notifyName.innerText = "Please input amount to deposit";
    openPopup();
    return;
  }
  const res = await fetch("http://localhost:3000/loggedin");
  const json = await res.json();

  depAmount = document.getElementById("inp1").value;
  depBal = +depAmount + +json[0].Balance;

  obj = {
    Balance: `${depBal}`,
  };
  url1 = `http://localhost:3000/loggedin/${json[0].id}`;
  url2 = `http://localhost:3000/members/${json[0].id}`;


  closeBtn.innerHTML = "<button onclick = 'closePopup()'>No</button>";
  confirmBtn.textContent = "Yes";
  notifyName.innerHTML =
    "Are you sure you want to proceed with the transaction?";
  openPopup();
  confirmBtn.setAttribute("onclick", "updateDb()");

};

let updateDb = async () => {
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
    record_type: "Deposit",
    record_date: `${new Date().getMonth() + 1
      } / ${new Date().getDate()}/ ${new Date().getFullYear()}`,
    record_time: `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
    record_amount: depAmount,
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
  window.location.href = "../html/menu.html";
});

clearBtn.addEventListener("click", () => {
  depInp.value = "";
});

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
