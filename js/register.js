let accName = document.getElementById("accName");
let accNum = document.getElementById("accNum");
let pin = document.getElementById("pin");
let deposit = document.getElementById("deposit");
let btnEl = document.getElementById("submitBtn");
let uniqueId = Date.now();
let stringId = String(uniqueId);
let random_accountNumber = stringId.slice(5);
let random_pin = stringId.slice(11);
accNum.value = random_accountNumber;
pin.value = random_pin + 10;
btnEl.addEventListener("click", (event) => {
  event.preventDefault();

  if (accName.value == "") {
    alert("please input username");
  } else if (pin.value == "") {
    alert("please input password");
  } else if (accNum.value == "") {
    alert("please input account number");
  } else if (deposit.value == "") {
    alert(" deposit a money first");
  } else {
    let regUser = {
      AccountName: accName.value,
      passwordUser: pin.value,
      AccountNum: accNum.value,
      Balance: deposit.value,
    };

    fetch("http://localhost:3000/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regUser),
    });

    window.location.href = `/html/adminpanel.html`;
  }
});
