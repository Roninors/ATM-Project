let btn = document.querySelector(".btn-holder");
let url1;
let url2;
let pinObj;
let userPassword;
let userId;
let accountInf = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();
  if (data == "") {
    window.location.href = "/html/atm.html";
  }
  let accNum = document.querySelector(".accnumber");
  let bal = document.querySelector(".balance");
  let accName = document.querySelector(".accountName");
  let pin = document.querySelector(".pin");
  userId = data[0].id;
  userPassword = data[0].passwordUser;
  url1 = `http://localhost:3000/loggedin/${data[0].id}`;
  url2 = `http://localhost:3000/members/${data[0].id}`;
  accNum.innerText = data[0].AccountNum;
  bal.innerText = data[0].Balance;
  pin.innerHTML = userPassword;
  accName.innerText = data[0].AccountName;
  btn.innerHTML = `<p onclick="appendInp()">Change</p>`;
};
document.addEventListener("DOMContentLoaded", accountInf());

let appendInp = () => {
  let pin = document.querySelector(".pin");
  pin.innerHTML = `<input type = "text" class ="pin-input" placeholder ="Pin" maxlength="4">`;
  btn.innerHTML = `<button class ="submitBtn" onclick = "updateDb()">Submit</button>`;
};

let updateDb = () => {
  let pin = document.querySelector(".pin");
  let btnEl = document.querySelector(".submitBtn");
  let newPin = document.querySelector(".pin-input").value;

  if (newPin == "") {
    alert("Input number");
    return;
  }
  pinObj = {
    passwordUser: `${newPin}`,
  };
  pin.innerHTML = "changing";
  btnEl.remove();

  setTimeout(async () => {
    await fetch(url1, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pinObj),
    });

    pin.innerHTML = userPassword;

    await fetch(url2, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pinObj),
    });
  }, 1000);
};
