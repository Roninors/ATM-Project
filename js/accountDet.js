let btn = document.querySelector(".btn-holder");
let url2;
let pinObj;
let accountInf = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();
  let accNum = document.querySelector(".accnumber");
  let bal = document.querySelector(".balance");
  let accName = document.querySelector(".accountName");
  let pin = document.querySelector(".pin");
  accNum.innerText = data[0].AccountNum;
  bal.innerText = data[0].Balance;
  pin.innerHTML = `${data[0].passwordUser} `;
  accName.innerText = data[0].AccountName;
  btn.innerHTML = `<p onclick="updateInf()">Change</p>`;
};
document.addEventListener("DOMContentLoaded", accountInf());

let updateInf = () => {
  let pin = document.querySelector(".pin");

  pin.innerHTML = `<input type = "text" class ="pin-input" placeholder ="Pin" maxlength="4">`;
  btn.innerHTML = `<button class ="submitBtn" onclick = "submitFunc()">Submit</button>`;
};

let submitFunc = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();
  let pin = document.querySelector(".pin");
  let btnEl = document.querySelector(".submitBtn");
  url2 = `http://localhost:3000/members/${data[0].id}`;
  let url1 = `http://localhost:3000/loggedin/${data[0].id}`;
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
    pin.innerHTML = data[0].passwordUser;
    await updateAdmin();
  }, 1000);
};

let updateAdmin = async () => {
  await fetch(url2, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pinObj),
  });
};
