let tb = document.getElementById("myTbody");
let btnEl = document.getElementById("submitBtn");
let btnEl2 = document.getElementById("closeBtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let accountnum = document.getElementById("accountnum");
let balance = document.getElementById("balance");
let userObj;
let url;
let bankRecords = document.getElementById("bankRec");

let showAccounts = async () => {
  const res = await fetch("http://localhost:3000/members");
  const json = await res.json();

  await json.map((data) => {
    tb.append(addMember(data));
  });
};

document.addEventListener("DOMContentLoaded", showAccounts());

let registerLoad = () => {
  window.location.href = "/html/register.html";
};
//search function
async function search() {
  let searchVal = document.getElementById("searchInp").value;
  if (!searchVal) {
    alert("Cannot Search");
    return;
  }

  let url = `http://localhost:3000/members?q=${searchVal}`;
  const res = await fetch(url);
  const json = await res.json();

  await json.map((data) => {
    let myTr2 = document.createElement("tr");
    myTr2.innerHTML = `
        <td>${data.AccountName}</td>
        <td>${data.AccountNum}</td>
        <td>${data.Balance}</td>
        <td >${data.passwordUser}</td>
        <td id ="balancechange"></td>
        <td><p onclick="showPopup(${data.id})">edit</p></td>`;
    tb.replaceWith(myTr2);
  });
}
//DOM members
function addMember({ AccountName, AccountNum, Balance, id, passwordUser }) {
  let myTr = document.createElement("tr");
  myTr.innerHTML = `
  <td>${AccountName}</td>
  <td>${AccountNum}</td>
  <td>${Balance}</td>
  <td>${passwordUser}</td>
  <td><p class = "editBtn"onclick="showPopup(${id});">edit</p></td>
  <td id="balancechange"></td>`;
  return myTr;
}
//editing details

async function showPopup(id) {
  openPopup();

  url = `http://localhost:3000/members/${id}`;
  urlLoggedin = `http://localhost:3000/loggedin/${id}`;

  const res = await fetch(url);
  const json = await res.json();

  username.value = json.AccountName;
  password.value = json.passwordUser;
  accountnum.value = json.AccountNum;

  btnEl.innerHTML = `
  <button onclick="updateDb(${id});closePopup()">Update</button>`;

  btnEl2.innerHTML = `
  <button  onclick="closePopup()">Cancel</button>`;
}

//PUT request
async function updateDb() {
  const res = await fetch(url);
  const json = await res.json();

  let depoAmount = document.getElementById("balance").value;
  let depBal = +depoAmount + +json.Balance;

  userObj = {
    AccountName: `${username.value}`,
    passwordUser: `${password.value}`,
    AccountNum: `${accountnum.value}`,
    Balance: `${depBal}`,
    id: `${json.id}`,
  };

  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  });

  await fetch(urlLoggedin, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  });
}
//variable
let popup = document.getElementById("popup");
//function to show popup by adding class list and also comes  with validation
function openPopup() {
  popup.classList.add("open-popup");
}
//closes the popup by removing the class list
function closePopup() {
  popup.classList.remove("open-popup");
}
