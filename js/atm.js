let submitBtn = document.getElementById("submitBtn");
let wdrawEl = document.getElementById("withdrawbtn");
let memberFunc = () => {
  let pass2 = document.getElementById("password").value;
  let url = `http://localhost:3000/members?passwordUser=${pass2}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      let pass = document.getElementById("password").value;
      let accnum = document.getElementById("username").value;
      let parseduser = JSON.parse(`{"AccountNum":"${accnum}" }`);
      let parsedpass = JSON.parse(`{"passwordUser":"${pass}" }`);

      if (
        parseduser.AccountNum == json[0].AccountNum &&
        parsedpass.passwordUser == json[0].passwordUser
      ) {
        let loggedIn = {
          AccountName: json[0].AccountName,
          passwordUser: json[0].passwordUser,
          AccountNum: json[0].AccountNum,
          Balance: json[0].Balance,
          id: json[0].id,
        };
        fetch("http://localhost:3000/loggedin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loggedIn),
        });
        window.location.href = "menu.html";
      }
    })
    .catch(() => {
      alert("Invalid Credentials");
    });
};
