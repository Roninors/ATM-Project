let tb = document.getElementById("myTbody");

fetch("http://localhost:3000/members")
  .then((res) => res.json())

  .then((json) => {
    json.map((data) => {
      tb.append(addMember(data));
    });
  });
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
<td  >${data.Balance}</td><td >${data.passwordUser}</td><td id ="balancechange"></td><td><p onclick="deposit(${data.id})">edit</p></td>`;

        tb.replaceWith(myTr2);
      });
    });
}
//DOM members
function addMember({ AccountName, AccountNum, Balance, id, passwordUser }) {
  let myTr = document.createElement("tr");

  myTr.innerHTML = `<td>${AccountName}</td>
<td>${AccountNum}</td>
<td  >${Balance}</td><td >${passwordUser}</td><td><p class = "editBtn"onclick="deposit(${id});">edit</p></td><td id="balancechange"></td>`;
  return myTr;
}
//editing details

function deposit(id) {
  openPopup();
  let btnEl = document.getElementById("submitBtn");
  let btnEl2 = document.getElementById("closeBtn");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let accountnum = document.getElementById("accountnum");
  let balance = document.getElementById("balance");

  let url = `http://localhost:3000/members/${id}`;
  fetch(url)
    .then((res) => res.json())

    .then((json) => {
      username.value = json.AccountName;
      password.value = json.passwordUser;
      accountnum.value = json.AccountNum;
      balance.value = json.Balance;
    });
  btnEl.innerHTML = `<button  onclick="gettingVal(${id});closePopup()">
    Update
  </button>`;
  btnEl2.innerHTML = `<button  onclick="closePopup()">
  Cancel
</button>`;
}

//PUT request
function gettingVal(id) {
  let mynewbalance = document.querySelector(".formbal");

  const form = new FormData(mynewbalance);
  let newdata = Object.fromEntries(form);
  let link = `http://localhost:3000/members/${id}`;
  fetch(link, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newdata),
  });
  updateDb(id);
}
let updateDb = (id) => {
  let mynewbalance = document.querySelector(".formbal");

  const form = new FormData(mynewbalance);
  let newdata = Object.fromEntries(form);
  let link = `http://localhost:3000/loggedin/${id}`;
  fetch(link, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newdata),
  });
};
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
