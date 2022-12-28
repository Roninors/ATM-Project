let all = document.getElementsByClassName("grid-btn");
let otherBtn = document.getElementById("otherBtn");
let buttons = Array.from(all);
buttons.map((button) => {
  button.addEventListener("click", () => {
    fetch("http://localhost:3000/loggedin")
      .then((res) => res.json())
      .then((json) => {
        let zeroBal = JSON.parse('{ "Balance": "0" }');
        if (json[0].Balance == zeroBal.Balance) {
          alert("you have zero balance"); //PLEASE ADD POPUP
          return;
        } else {
          var newBal = json[0].Balance - button.textContent;
          if (Math.sign(newBal) === -1) {
            alert("insufficient funds"); //PLEASE ADD POPUP
            return;
          }
          var obj = {
            Balance: `${newBal}`,
          };

          let url = `http://localhost:3000/loggedin/${json[0].id}`;

          updateLoggedIn(url, obj);
        }
      })
      .catch(function () {
        console.log("error");
      });
  });
});

let updateLoggedIn = (url, obj) => {
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  updateAdmin();
};

let updateAdmin = () => {
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
      var obj2 = {
        Balance: `${json[0].Balance}`,
      };
      let url2 = `http://localhost:3000/members/${json[0].id}`;
      updateAdmin1(url2, obj2);
    })
    .catch(function () {
      console.log("error");
    });
};

let updateAdmin1 = (url2, obj2) => {
  fetch(url2, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj2),
  });
};

let accountInf = () => {
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
      let accNum = document.querySelector(".accNum");
      let bal = document.querySelector(".bal");
      let accName = document.querySelector(".accountname");

      accNum.innerText = json[0].AccountNum;
      bal.innerText = json[0].Balance;

      accName.innerText = json[0].AccountName;
    });
};

otherBtn.addEventListener("click", () => {
  window.location.href = "wdraw.html";
});
