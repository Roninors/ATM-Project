let submitBtn = document.getElementById("submitBtn");
let wdrawEl = document.getElementById("withdrawbtn");
let loggedIn;

let memberFunc = async () => {
  try {
    let pass2 = document.getElementById("password").value;
    let url = `http://localhost:3000/members?passwordUser=${pass2}`;
    const res = await fetch(url);
    const data = await res.json();

    let pass = document.getElementById("password").value;
    let accnum = document.getElementById("username").value;
    let parseduser = JSON.parse(`{"AccountNum":"${accnum}" }`);
    let parsedpass = JSON.parse(`{"passwordUser":"${pass}" }`);

    if (
      parseduser.AccountNum == data[0].AccountNum &&
      parsedpass.passwordUser == data[0].passwordUser
    ) {
      loggedIn = {
        AccountName: data[0].AccountName,
        passwordUser: data[0].passwordUser,
        AccountNum: data[0].AccountNum,
        Balance: data[0].Balance,
        id: data[0].id,
      };
      postUserlogin();
    }
  } catch (error) {
    alert("Invalid Credentials");
  }
};

let postUserlogin = async () => {
  await fetch("http://localhost:3000/loggedin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loggedIn),
  });
  window.location.href = "menu.html";
};
