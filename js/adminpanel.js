let tb = document.getElementById("myTbody");
let btnEl = document.getElementById("submitBtn");
let btnEl2 = document.getElementById("closeBtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let accountnum = document.getElementById("accountnum");
let balance = document.getElementById("balance");
let url;
let showAccounts = () => {
  fetch("http://localhost:3000/members")
    .then((res) => res.json())

    .then((json) => {
      json.map((data) => {
        tb.append(addMember(data));
      });
    });
};

document.addEventListener("DOMContentLoaded", showAccounts());

//search function
function search() {
  let searchVal = document.getElementById("searchInp").value;

  let url = `http://localhost:3000/members?q=${searchVal}`;
  fetch(url)
    .then((res) => res.json())

    .then((json) => {
      json.map((data) => {
        let myTr2 = document.createElement("tr");
        myTr2.innerHTML = `<td>${data.AccountName}</td>
<td>${data.AccountNum}</td>
<td  >${data.Balance}</td><td >${data.passwordUser}</td><td id ="balancechange"></td><td><p onclick="showPopup(${data.id})">edit</p></td>`;

        tb.replaceWith(myTr2);
      });
    });
}
//DOM members
function addMember({ AccountName, AccountNum, Balance, id, passwordUser }) {
  let myTr = document.createElement("tr");
  myTr.innerHTML = `<td>${AccountName}</td>
<td>${AccountNum}</td>
<td  >${Balance}</td><td >${passwordUser}</td><td><p class = "editBtn"onclick="showPopup(${id});">edit</p></td><td id="balancechange"></td>`;
  return myTr;
}
//editing details

function showPopup(id) {
  openPopup();
  url = `http://localhost:3000/members/${id}`;
  fetch(url)
    .then((res) => res.json())

    .then((json) => {
      username.value = json.AccountName;
      password.value = json.passwordUser;
      accountnum.value = json.AccountNum;
    });
  btnEl.innerHTML = `<button  onclick="updateDb(${id});closePopup()">
    Update
  </button>`;
  btnEl2.innerHTML = `<button  onclick="closePopup()">
  Cancel
</button>`;
}

//PUT request
function updateDb() {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      let depoAmount = document.getElementById("balance").value;
      let depBal = +depoAmount + +json.Balance;
      let userObj = {
        AccountName: `${username.value}`,
        passwordUser: `${password.value}`,
        AccountNum: `${accountnum.value}`,
        Balance: `${depBal}`,
        id: `${json.id}`,
      };

      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      });
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
